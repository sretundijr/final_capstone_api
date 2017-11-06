
const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const { createNewUser } = require('../models/advisor');

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

router.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

// login user
router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json({ user: req.body });
});

router.post('/new-user', (req, res) => {
  console.log(req.body);
  createNewUser(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

module.exports = router;
