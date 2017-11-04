
const mockCustomerList = () => {
  return [
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Steve Retundi',
      customerEmail: 'steve@question.com',
      appointmentDate: '11-11-2017',
      completedQuestionnaire: true,
      returnedAnswers: [
        {
          archived: false,
          'Is there a driveability issue accompaning the check engine light?': 'hello',
          'How long has the fault light been on?': 'long time',
          'Did something happen prior to the light coming on?': 'everything',
          'Did something happen prior to the light co?': 'everything',
        },
      ],
    },
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Christina',
      customerEmail: 'christina@question.com',
      appointmentDate: '12-14-2017',
      completedQuestionnaire: true,
      returnedAnswers: [
        {
          archived: false,
          'Is there a driveability issue accompaning the check engine light?': 'hello',
          'How long has the fault light been on?': 'long time',
          'Did something happen prior to the light coming on?': 'everything',
          'Did something happen prior to the light co?': 'everything',
        },
      ],
    },
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Steve Retundi',
      customerEmail: 'steve@question.com',
      appointmentDate: '11-11-2017',
      completedQuestionnaire: true,
      returnedAnswers: [
        {
          archived: false,
          'Is there a driveability issue accompaning the check engine light?': 'hello',
          'How long has the fault light been on?': 'long time',
          'Did something happen prior to the light coming on?': 'everything',
          'Did something happen prior to the light co?': 'everything',
        },
      ],
    },
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Christina',
      customerEmail: 'christina@question.com',
      appointmentDate: '12-14-2017',
      completedQuestionnaire: true,
      returnedAnswers: [
        {
          archived: false,
          'Is there a driveability issue accompaning the check engine light?': 'hello',
          'How long has the fault light been on?': 'long time',
          'Did something happen prior to the light coming on?': 'everything',
          'Did something happen prior to the light co?': 'everything',
        },
      ],
    },
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Christina',
      customerEmail: 'christina@question.com',
      appointmentDate: '12-14-2017',
      completedQuestionnaire: true,
      returnedAnswers: [
        {
          archived: true,
          'Is there a driveability issue accompaning the check engine light?': 'hello',
          'How long has the fault light been on?': 'long time',
          'Did something happen prior to the light coming on?': 'everything',
          'Did something happen prior to the light co?': 'everything',
        },
      ],
    },
  ];
};

module.exports = mockCustomerList;
