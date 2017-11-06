
const mongoose = require('mongoose');

const advisorSchema = mongoose.Schema({
  advisorName: { type: String, required: true },
  advisorEmail: { type: String, required: true },
  shopName: { type: String, required: true },
});

const Advisor = mongoose.model('Advisor', advisorSchema);

const createNewUser = (advisor) => {
  return Advisor.create({
    advisorName: advisor.advisorName,
    advisorEmail: advisor.advisorEmail,
    shopName: advisor.shopName,
  });
};

const findAdvisor = (id) => {
  return Advisor.find({
    _id: id,
  })
    .exec();
};

module.exports = { Advisor, createNewUser, findAdvisor };

