
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
  return removeQuestionnaireData;
};

const returnCompletedQuestionnaire = (id, customerList) => {
  const customer = customerList.filter((item) => {
    if (item.id === id) {
      return item;
    }
    return '';
  });
  const currentQuestionnaire = customer[0].returnedAnswers.filter((item) => {
    if (!item.archived) {
      return item;
    }
    return '';
  });
  return currentQuestionnaire;
};

module.exports = { filterCustomerResults, returnCompletedQuestionnaire };
