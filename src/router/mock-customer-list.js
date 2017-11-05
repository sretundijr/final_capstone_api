
const mockCustomerList = () => {
  return [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
      id: '4',
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
          'Did something happen prior to the light co?': 'number 4 answers',
        },
      ],
    },
    {
      id: '5',
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
          'Did something happen prior to the light co?': 'number fives answers',
        },
      ],
    },
  ];
};

module.exports = mockCustomerList;
