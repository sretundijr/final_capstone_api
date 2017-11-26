
const strictUriEncode = require('strict-uri-encode');
const { CLIENT_ORIGIN } = require('../config');

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAIL_GUN_API_KEY,
  domain: process.env.EMAIL_URL,
});

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

const encodeUri = (emailInfo) => {
  const url = CLIENT_ORIGIN;
  const encoded = strictUriEncode(`/troubleshooting-questionnaire?customerId=${emailInfo.customerId}&shopName=${emailInfo.shopName}&advisorName=${emailInfo.advisorName}&appointmentDate=${emailInfo.appointmentDate}&customerName=${emailInfo.customerName}`);
  return `${url}${encoded}`;
};

const formatAdvisorName = (name) => {
  return name.replace(/\s/g, '');
};

const sendCustomerEmail = (emailInfo) => {
  const data = {
    from: `${formatAdvisorName(emailInfo.advisorName)}@technician-assist.com`,
    to: `${emailInfo.customerEmail}`,
    subject: `Your upcoming appointment at ${emailInfo.shopName}`,
    text: `
    We are looking forward to your appointment on ${emailInfo.appointmentDate}. 
    To guarantee the best possbile service we ask that you click the link below 
    and fill out the survey. This survey is a series of questions that allow us 
    to better address the issues you are expeirencing with your vehicle. The 
    survey is optional, but it does offer great insight. Thank you ${emailInfo.customerName}.
    ${encodeUri(emailInfo)}
    `,
  };
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
};

const sendTechnicianEmail = (emailInfo) => {
  const data = {
    from: 'info@technician-assist.com',
    to: `${emailInfo.technicianEmail}`,
    subject: `Info reguarding ${emailInfo.customerName} upcoming appointment`,
    text: `
    Please click the link below to view the troubleshooting questionnaire
    ${emailInfo.customerLink}
    `,
  };
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
};

module.exports = {
  filterCustomerResults,
  returnCompletedQuestionnaire,
  sendCustomerEmail,
  sendTechnicianEmail,
};
