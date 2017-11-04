const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const mockCustomerList = require('./mock-customer-list');

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

const filterCustomerResults = () => {
  const customerDataOnly = mockCustomerList().filter((item) => {
    if (item.completedQuestionnaire) {
      return {
        id: item.id,
        customerName: item.customerName,
        customerEmail: item.customerEmail,
        appointmentDate: item.appointmentDate,
      };
    }
  });
  console.log(customerDataOnly);
  return customerDataOnly;
};

// get returned questionnaires
router.get('/returned', (req, res) => {
  res.status(200).json(filterCustomerResults());
});

// used to send an email called from send email in client
router.post('/send-email', (req, res) => {
  console.log(req.body);
  res.status(200).json({ customer: req.body });
});

module.exports = router;
