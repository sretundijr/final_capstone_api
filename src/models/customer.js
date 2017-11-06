
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  completedQuestionnaire: { type: Boolean },
  returnedAnswers: [
    {
      archived: { type: Boolean },
      answers: { type: Object },
    },
  ],
  advisors: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Advisor' },
  ],
});

const Customer = mongoose.model('Customer', customerSchema);

const saveNewCustomer = (customer) => {
  console.log(customer);
  return Customer.create({
    customerName: customer.customerName,
    customerEmail: customer.customerEmail,
    appointmentDate: customer.appointmentDate,
    completedQuestionnaire: false,
    advisors: [
      {
        _id: customer._id,
      },
    ],
  });
};

module.exports = { Customer, saveNewCustomer };

