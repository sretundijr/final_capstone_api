
/* global describe it after before */

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Enpoints', () => {
  before(() => runServer());

  after(() => closeServer());

  it('/', () => {
    return chai.request(app)
      .get('/')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
  });
});
