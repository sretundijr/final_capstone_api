
const findCompletedQuestionnaire = (customerList) => {
  const customerDataOnly = customerList.filter((item) => {
    if (item.completedQuestionnaire) {
      return item;
    }
    return '';
  });
  return customerDataOnly;
};

const filterCustomerResults = (customerList) => {
  const removeQuestionnaireData = findCompletedQuestionnaire(customerList)
    .map((item) => {
      return {
        id: item.id,
        customerName: item.customerName,
        customerEmail: item.customerEmail,
        appointmentDate: item.appointmentDate,
      };
    });
  return removeQuestionnaireData;
};

// removed archived field from answers object
const removeArchivedField = (obj) => {
  const answerField = Object.keys(obj).map((key) => {
    if (key !== 'archived') {
      return {
        [key]: obj[key],
      };
    }
    return '';
  });
  const removeWhiteSpace = answerField.filter((item) => {
    if (item !== '') {
      return item;
    }
  });
  return removeWhiteSpace;
};

const returnCompletedQuestionnaire = (id, customerList) => {
  const findByCustomerId = findCompletedQuestionnaire(customerList)
    .filter((item) => {
      if (item.id === id) {
        return item;
      }
    });
  // find only none archived answers
  const findCurrentAnswers = findByCustomerId[0].returnedAnswers
    .filter((item) => {
      if (item.archived === false) {
        return item;
      }
    });
  return findCurrentAnswers;
};

module.exports = { filterCustomerResults, returnCompletedQuestionnaire };
