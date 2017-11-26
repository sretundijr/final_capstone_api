
// const MockQuestionnaire = require('../models/mock-questionniare');

const Questionnaire = require('../mock-questionnaire.json');

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const { saveReturnedQuestionnaire } = require('../models/customer');

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

// get questions
router.get('/', (req, res) => {
  res.status(200).json(Questionnaire);
});

// save completed questionnaire
router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  saveReturnedQuestionnaire(req.body)
    .then(() => {
      res.status(200).json({ saved: true });
    });
});

module.exports = router;
