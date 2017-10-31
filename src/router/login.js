
const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

router.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json({ user: req.body });
});

router.post('/new-user', (req, res) => {
  // console.log(req.body);
  res.status(200).json({ newUser: req.body });
});

module.exports = router;
