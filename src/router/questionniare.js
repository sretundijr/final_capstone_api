
const MockQuestionnaire = require('./mock-questionniare');

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

router.get('/', (req, res) => {
  res.json(MockQuestionnaire());
});

module.exports = router;
