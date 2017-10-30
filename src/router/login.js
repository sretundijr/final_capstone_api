
const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

router.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

router.get('/new-user', (req, res) => {
  res.json({ newUser: 'hi' });
});

module.exports = router;
