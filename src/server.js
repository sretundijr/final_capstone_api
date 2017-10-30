const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const loginRouter = require('./router/login');
const questionnaireRouter = require('./router/questionniare');

const { CLIENT_ORIGIN } = require('../config');

// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

const app = express();

app.use(morgan('common'));

app.use(cors({ origin: CLIENT_ORIGIN }));

app.use('/api/login', loginRouter);

app.use('/api/questionnaire', questionnaireRouter);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close((err) => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
