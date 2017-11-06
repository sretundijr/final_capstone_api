const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const loginRouter = require('./router/login');
const questionnaireRouter = require('./router/questionniare');
const advisorDashRouter = require('./router/advisor-dashboard');

const { CLIENT_ORIGIN, DATABASE_URL } = require('../config');

// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const app = express();

app.use(morgan('common'));

app.use(cors({ origin: CLIENT_ORIGIN }));

app.use('/api/login', loginRouter);

app.use('/api/questionnaire', questionnaireRouter);

app.use('/api/advisor-dashboard', advisorDashRouter);

let server;

function runServer(databaseUrl = DATABASE_URL) {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useMongoClient: true }, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      }).on('error', (error) => {
        mongoose.disconnect();
        reject(error);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  }));
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
