/** @constant {Request[]} */
export const fakeRequests = [
  {
    id: 'RF_1',
    title: 'Test Request 1',
    description: 'Test request 1 detail. ',
    status: 'REGISTERED',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    createdBy: 'Foo Bar'
  },
  {
    id: 'RF_2',
    title: 'Test Request 2',
    description: 'Test request 2 detail. ',
    status: 'IN_PROGRESS',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 18)),
    createdBy: 'John Smith'
  },
  {
    id: 'RF_3',
    title: 'Test Request 3',
    description: 'Test request 3 detail. ',
    status: 'IN_PROGRESS',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 17)),
    createdBy: 'John Smith'
  }
];
