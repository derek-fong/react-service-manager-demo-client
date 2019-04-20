/** @constant {Comment[]} */
export const fakeComments = [
  // Fake comments for `RF_1`:
  {
    id: 'COMMENT_1',
    referenceId: 'RF_1',
    title: 'Created Request',
    description: 'Foo Bar created request. ',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    createdBy: 'SYSTEM'
  },
  {
    id: 'COMMENT_2',
    referenceId: 'RF_1',
    title: 'Updated Request Status',
    description: 'Request status set as "Registered". ',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    createdBy: 'SYSTEM'
  },
  // Fake comments for `RF_2`:
  {
    id: 'COMMENT_3',
    referenceId: 'RF_2',
    title: 'Created Request',
    description: 'John Smith created request. ',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 18)),
    createdBy: 'SYSTEM'
  },
  {
    id: 'COMMENT_4',
    referenceId: 'RF_2',
    title: 'Updated Request Status',
    description: 'Request status set as "In Progress". ',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 18)),
    createdBy: 'SYSTEM'
  },
  // Fake comments for `RF_3`:
  {
    id: 'COMMENT_5',
    referenceId: 'RF_3',
    title: 'Created Request',
    description: 'John Smith created request. ',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 17)),
    createdBy: 'SYSTEM'
  },
  {
    id: 'COMMENT_6',
    referenceId: 'RF_3',
    title: 'Updated Request Status',
    description: 'Request status set as "In Progress". ',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 17)),
    createdBy: 'SYSTEM'
  }
];

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
