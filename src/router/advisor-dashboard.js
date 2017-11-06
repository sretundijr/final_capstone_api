const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const mockCustomerList = require('../models/mock-customer-list');

const { findAdvisor } = require('../models/advisor');

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
  saveNewCustomer(req.body)
    .then((user) => {
      res.status(200).json(user);
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
