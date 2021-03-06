
/* global describe it after before */

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../src/server');

const should = chai.should();

chai.use(chaiHttp);

// todo
describe('Enpoints', () => {
  before(() => runServer());

  after(() => closeServer());

  it('/', () => {
    return chai.request(app)
      .get('/api/questionnaire')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
      });
  });

  // it('should post to questionnaire', () => {
  //   return chai.request(app)
  //     .post('/api/questionnaire')
  //     .then((res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.an('object');
  //     });
  // });
  // todo modify test after adding auth0 login
  // it('should post an existing user', () => {
  //   return chai.request(app)
  //     .post('/api/login')
  //     .then((res) => {
  //       res.should.have.status(200);
  //       res.should.be.an('object');
  //     });
  // });

  // it('should post a new user', () => {
  //   return chai.request(app)
  //     .post('/api/login/new-user')
  //     .then((res) => {
  //       res.should.have.status(200);
  //       res.should.be.an('object');
  //     });
  // });

  // it('should get a list of customers that completed a questionnaire', () => {
  //   return chai.request(app)
  //     .get('/api/advisor-dashboard/returned')
  //     .then((res) => {
  //       res.should.have.status(200);
  //       res.should.be.an('object');
  //     });
  // });

  // it('should make post request to send email', () => {
  //   return chai.request(app)
  //     .post('/api/advisor-dashboard/send-email')
  //     .then((res) => {
  //       res.should.have.status(200);
  //       res.should.be.an('object');
  //     });
  // });

  // it('should make a get request to completed questionnaire', () => {
  //   return chai.request(app)
  //     .get(`/api/advisor-dashboard/completed-questionnaire/${1}`)
  //     .then((res) => {
  //       res.should.have.status(200);
  //       res.should.be.an('object');
  //     });
  // });

  it('should make a post request to sendQuestionnaireLink', () => {
    return chai.request(app)
      .post('/api/advisor-dashboard/send-questionnaire-link')
      .then((res) => {
        res.should.have.status(200);
        res.should.be.an('object');
      });
  });
});
