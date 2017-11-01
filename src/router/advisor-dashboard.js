const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const mockCustomerList = require('./mock-customer-list');

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

// get returned questionnaires
router.get('/returned', (req, res) => {
  res.status(200).json(mockCustomerList());
});

// used to send an email called from send email in client
router.post('/send-email', (req, res) => {
  console.log(req.body);
  res.status(200).json({ customer: req.body });
});

module.exports = router;
