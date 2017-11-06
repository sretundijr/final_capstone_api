
const mongoose = require('mongoose');

const advisorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  advisorName: { type: String, required: true },
  advisorEmail: { type: String, required: true },
  shopName: { type: String, required: true },
});

const Advisor = mongoose.model('Advisor', advisorSchema);

module.exports = { Advisor };
