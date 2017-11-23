const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const { CLIENT_ORIGIN } = require('../../config');

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAIL_GUN_API_KEY,
  domain: process.env.EMAIL_URL,
});

const jsonParser = bodyParser.json();

const mockCustomerList = require('../models/mock-customer-list');

const { findAdvisor, findAdvisorAndUpdate } = require('../models/advisor');

const { saveNewCustomer } = require('../models/customer');

const { filterCustomerResults, returnCompletedQuestionnaire } = require('../helpers');

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

router.get('/user/:id', (req, res) => {
  console.log(req.params.id);
  findAdvisor(req.params.id)
    .then((advisor) => {
      res.status(200).json(advisor);
    });
});

// get a list of customers that have completed a questionnaire
router.get('/returned', (req, res) => {
  res.status(200).json(filterCustomerResults(mockCustomerList()));
});

// todo build questionnaire link that gets sent to client
// used to send an email to the customer called from send email in client
router.post('/send-email', (req, res) => {
  console.log(req.body);
  saveNewCustomer(req.body.customer)
    .then((customer) => {
      console.log('here')
      console.log(customer);
      return findAdvisorAndUpdate(req.body.advisorId, customer._id);
    })
    .then((advisor) => {
      const emailDataObj = {
        customerName: req.body.customer.customerName,
        customerEmail: req.body.customer.customerEmail,
        shopName: advisor.shopName,
        appointmentDate: req.body.customer.appointmentDate,
        advisorName: advisor.advisorName,
        advisorEmail: advisor.advisorEmail,
      };
      const data = {
        from: `${emailDataObj.advisorEmail}`,
        to: `${emailDataObj.customerEmail}`,
        subject: `Your upcoming appointment at ${emailDataObj.shopName}`,
        text: `We are looking forward to your appointment on ${emailDataObj.appointmentDate}. 
                To guarantee the best possbile service we ask that you click the link below 
                and fill out the survey. This survey is a series of questions that allow us 
                to better address the issues you are expeirencing with your vehicle. The 
                survey is optional, but it does offer great insight. Thank you 
                ${emailDataObj.customerName}. 
        ${CLIENT_ORIGIN}/troubleshooting-questionnaire?shopName=${emailDataObj.shopName.replace(/\s/g, '')}&advisorName=${emailDataObj.advisorName.replace(/\s/g, '')}&appointmentDate=${emailDataObj.appointmentDate.toString().replace(/\s/g, '')}&customerName=${emailDataObj.customerName.replace(/\s/g, '')}
        `,
      };
      mailgun.messages().send(data, (error, body) => {
        console.log(body);
      });
    })
    .then(() => {
      res.status(200).json({ status: 'succus' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

// get the completed questionnaire for the a particular customer
router.get('/completed-questionnaire/:id', (req, res) => {
  console.log(req.params.id);
  res.status(200).json(returnCompletedQuestionnaire(req.params.id, mockCustomerList()));
});

// send questionnaire link to technician
router.post('/send-questionnaire-link', (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'success' });
});

module.exports = router;
