require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');

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

// const checkJwt = jwt({
//   // Dynamically provide a signing key
//   // based on the kid in the header and
//   // the signing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://advisor-login.auth0.com/.well-known/jwks.json`,
//   }),

//   // Validate the audience and the issuer.
//   audience: 'https://advisor-login.auth0.com/api/v2/',
//   issuer: `https://advisor-login.auth0.com/`,
//   algorithms: ['RS256'],
// });

// const checkScopes = jwtAuthz(['read:messages']);


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
