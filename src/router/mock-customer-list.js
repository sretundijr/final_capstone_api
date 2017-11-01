
const mockCustomerList = () => {
  return [
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Steve Retundi',
      customerEmail: 'steve@question.com',
      appointmentDate: '11-11-2017',
    },
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Christina',
      customerEmail: 'christina@question.com',
      appointmentDate: '12-14-2017',
    },
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Steve Retundi',
      customerEmail: 'steve@question.com',
      appointmentDate: '11-11-2017',
    },
    {
      id: Math.floor(Math.random() * 10000) + 1,
      customerName: 'Christina',
      customerEmail: 'christina@question.com',
      appointmentDate: '12-14-2017',
    },
  ];
};

module.exports = mockCustomerList;
