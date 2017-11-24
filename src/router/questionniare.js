
// const MockQuestionnaire = require('../models/mock-questionniare');

const Questionnaire = require('../mock-questionnaire.json');

const express = require('express');

const router = express.Router();


const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

// get questions
router.get('/', (req, res) => {
  res.json(Questionnaire);
});

// save completed questionnaire
router.post('/', jsonParser, (req, res) => {
  res.status(200).json({ savedinfo: req.body });
});

module.exports = router;
