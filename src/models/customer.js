
const mongoose = require('mongoose');

const { Advisor } = require('./advisor');

const { findNonArchivedQuestionAndAnswerObjs } = require('../helpers');

const customerSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  completedQuestionnaire: { type: Boolean },
  returnedAnswers: [
    {
      selectedIssue: { type: String },
      archived: { type: Boolean },
      questions: [
        { type: String },
      ],
      answers: [
        { type: String },
      ],
    },
  ],
  advisors: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Advisor' },
  ],
});

const Customer = mongoose.model('Customer', customerSchema);

const saveNewCustomer = (customerObj) => {
  return Customer.findOneAndUpdate(
    { customerName: customerObj.customerName },
    {
      $set: {
        customerEmail: customerObj.customerEmail,
        appointmentDate: customerObj.appointmentDate,
        completedQuestionnaire: false,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
};

const findCustomer = (id) => {
  return Customer.find({
    _id: id,
  })
    .exec();
};

const saveReturnedQuestionnaire = (customerObj) => {
  const returnedQuestions = Object.keys(customerObj.customerAnswers);
  const returnedAnswers = Object.values(customerObj.customerAnswers);
  return Customer.findOneAndUpdate(
    { _id: customerObj.customerId },
    {
      $set: {
        completedQuestionnaire: true,
      },
      $addToSet: {
        returnedAnswers: {
          selectedIssue: customerObj.selectedIssue,
          archived: false,
          questions: returnedQuestions,
          answers: returnedAnswers,
        },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
};

const returnCustomersPerAdvisor = (id) => {
  return Advisor.findOne(
    { _id: id },
    {
      customers: 1,
      _id: 0,
    },
  )
    .then((customerlist) => {
      const objIds = customerlist.customers.map(customerId => mongoose.Types.ObjectId(customerId));
      return Customer.find({ _id: { $in: objIds } });
    });
};

// returns only the most recent questionnaire completed by the customer
const getCompletedQuestionnaireByCustomerId = (id) => {
  return Customer.findOne(
    { _id: id },
    {
      returnedAnswers: 1,
      _id: 0,
    },
  )
    .then((obj) => {
      return findNonArchivedQuestionAndAnswerObjs(obj.returnedAnswers);
    })
    .then((filteredResults) => {
      const questionsAndAnswers = filteredResults.map((item) => {
        return {
          selectedIssue: item.selectedIssue,
          questions: item.questions,
          answers: item.answers,
        };
      });
      return questionsAndAnswers[questionsAndAnswers.length - 1];
    });
};

module.exports = {
  Customer,
  saveNewCustomer,
  findCustomer,
  saveReturnedQuestionnaire,
  returnCustomersPerAdvisor,
  getCompletedQuestionnaireByCustomerId,
};

