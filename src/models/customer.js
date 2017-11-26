
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  completedQuestionnaire: { type: Boolean },
  returnedAnswers: [
    {
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
      $addToSet: {
        returnedAnswers: {
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

module.exports = {
  Customer,
  saveNewCustomer,
  findCustomer,
  saveReturnedQuestionnaire,
};

