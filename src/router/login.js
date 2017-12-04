
const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const requestPromise = require('request-promise');

const jsonParser = bodyParser.json();

const { createNewUser, returnExistingUser } = require('../models/advisor');

// todo is this right, I havent seen an example that shows this
router.use(jsonParser);

// login user
router.post('/', (req, res) => {
  const accessToken = req.body.advisorInfo;
  // get user info to gain access to user_metadata from auth0
  const userInfoEndpoint = {
    method: 'GET',
    url: 'https://advisor-login.auth0.com/userinfo',
    headers: { authorization: `Bearer ${accessToken}` },
    json: true,
  };

  // get token to access auth0 management api
  const getClientAuthToken = {
    method: 'POST',
    url: 'https://advisor-login.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: process.env.AUDIENCE,
      grant_type: 'client_credentials',
    },
    json: true,
  };

  // options to retrieve user meta data
  const managementApiEndpoint = (userId, token) => {
    return {
      method: 'GET',
      url: `https://advisor-login.auth0.com/api/v2/users/${userId}`,
      headers:
        {
          authorization: `Bearer ${token.access_token}`,
          'content-type': 'application/json',
        },
      json: true,
    };
  };

  requestPromise(userInfoEndpoint)
    .then((user) => {
      return requestPromise(getClientAuthToken)
        .then((authToken) => {
          return requestPromise(managementApiEndpoint(user.sub, authToken));
        });
    })
    .then((response) => {
      if (response.logins_count === 1) {
        const advisor = {
          advisorName: response.user_metadata.fullName,
          advisorEmail: response.email,
          shopName: response.user_metadata.shopName,
        };
        return createNewUser(advisor);
      }
      return returnExistingUser(response.email);
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

module.exports = router;
