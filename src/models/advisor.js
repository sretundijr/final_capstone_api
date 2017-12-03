
const mongoose = require('mongoose');

const advisorSchema = mongoose.Schema({
  advisorName: { type: String, required: true },
  advisorEmail: { type: String, required: true },
  shopName: { type: String, required: true },
  customers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  ],
});

const Advisor = mongoose.model('Advisor', advisorSchema);

const createNewUser = (advisor) => {
  return Advisor.create({
    advisorName: advisor.advisorName,
    advisorEmail: advisor.advisorEmail,
    shopName: advisor.shopName,
  });
};

const returnExistingUser = advisorEmail =>
  Advisor.findOne({ advisorEmail }).exec();


const findAdvisorAndUpdate = (id, customerId) => {
  return Advisor.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $addToSet: {
        customers: customerId,
      },
    },
  )
    .exec();
};

const findAdvisor = (id) => {
  return Advisor.find({
    _id: id,
  })
    .exec();
};

module.exports = {
  Advisor,
  createNewUser,
  returnExistingUser,
  findAdvisorAndUpdate,
  findAdvisor,
};

