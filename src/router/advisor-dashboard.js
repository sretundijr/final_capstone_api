const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const mockCustomerList = require('./mock-customer-list');

const { filterCustomerResults, returnCompletedQuestionnaire } = require('../helpers');

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

// get a list of customers that have completed a questionnaire
router.get('/returned', (req, res) => {
  res.status(200).json(filterCustomerResults(mockCustomerList()));
});

// used to send an email to the customer called from send email in client
router.post('/send-email', (req, res) => {
  console.log(req.body);
  res.status(200).json({ customer: req.body });
});

// get the completed questionnaire for the a particular customer
router.get('/completed-questionnaire/:id', (req, res) => {
  console.log(req.params.id);
  res.status(200).json(returnCompletedQuestionnaire(req.params.id, mockCustomerList()));
});

module.exports = router;
