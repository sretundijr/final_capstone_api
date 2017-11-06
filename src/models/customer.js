
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

module.exports = { Customer };

