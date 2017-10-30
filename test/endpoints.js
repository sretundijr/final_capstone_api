const chai = require('chai');
const chaiHttp = require('chai-http');

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const { app, runServer, closeServer } = require('../server');

// import chai and declare a variable for should
const should = chai.should();

chai.use(chaiHttp);

describe('Enpoints', function () {
  before(function () {
    return runServer();
  });

  after(function () {
    return closeServer();
  });

  it('/', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        res.should.have.status(200);
        res.should.be.json;
      });
  });
});