
/* global describe it */

const chai = require('chai');

const should = chai.should();

const { filterCustomerResults, returnCompletedQuestionnaire } = require('../src/helpers');

// mock test data
const customerList = [
  {
    id: '1',
    customerName: 'Steve Retundi',
    customerEmail: 'steve@question.com',
    appointmentDate: '11-11-2017',
    completedQuestionnaire: true,
    returnedAnswers: [
      {
        archived: false,
        'Is there a driveability issue accompaning the check engine light?': 'hello',
        'How long has the fault light been on?': 'long time',
        'Did something happen prior to the light coming on?': 'everything',
        'Did something happen prior to the light co?': 'everything',
      },
    ],
  },
  {
    id: Math.floor(Math.random() * 10000) + 1,
    customerName: 'Christina',
    customerEmail: 'christina@question.com',
    appointmentDate: '12-14-2017',
    completedQuestionnaire: false,
    returnedAnswers: [
      {
        archived: false,
        'Is there a driveability issue accompaning the check engine light?': 'hello',
        'How long has the fault light been on?': 'long time',
        'Did something happen prior to the light coming on?': 'everything',
        'Did something happen prior to the light co?': 'everything',
      },
    ],
  },
];

describe('test filter customer results function', () => {
  it('accept a list of customers and return only the ones with a completed questionnaire', () => {
    const filteredList = filterCustomerResults(customerList);
    const correctReturnValue = [
      {
        id: '1',
        customerName: 'Steve Retundi',
        customerEmail: 'steve@question.com',
        appointmentDate: '11-11-2017',
      },
    ];
    filteredList.should.eql(correctReturnValue);
  });
});

describe('test returnCompletedQuestionnaire', () => {
  it('accepts a list and an id, returns the current questionnaire', () => {
    const filteredList = returnCompletedQuestionnaire('1', customerList);
    const correctReturnValue = [
      {
        archived: false,
        'Is there a driveability issue accompaning the check engine light?': 'hello',
        'How long has the fault light been on?': 'long time',
        'Did something happen prior to the light coming on?': 'everything',
        'Did something happen prior to the light co?': 'everything',
      },
    ];
    filteredList.should.eql(correctReturnValue);
  });
});
