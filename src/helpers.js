
const filterCustomerResults = (customerList) => {
  const customerDataOnly = customerList.filter((item) => {
    if (item.completedQuestionnaire) {
      return item;
    }
    return '';
  });
  const removeQuestionnaireData = customerDataOnly.map((item) => {
    return {
      id: item.id,
      customerName: item.customerName,
      customerEmail: item.customerEmail,
      appointmentDate: item.appointmentDate,
    };
  });
  console.log(removeQuestionnaireData);
  return removeQuestionnaireData;
};

module.exports = { filterCustomerResults };
