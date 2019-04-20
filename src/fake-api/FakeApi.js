import startCase from 'lodash.startcase';

import { fakeRequests } from './seeds';

/**
 * @constant {string}
 * @default
 * We are using this name as default because it sounds cool.
 */
const fakeCreator = 'Foo Bar';

/**
 * Class simulate a fake API service.
 * Using session storage to simulate backend storage.
 * Simulate delayed CRUD operations with `setTimeout()`.
 */
class FakeApi {
  /**
   * Create a fake API.
   * @param {Request[]} requests - Sample fake requests.
   */
  constructor({ requests }) {
    // Set requests only if not already defined.
    if (!(this.requests && this.requests.length > 0)) {
      this.requests = requests;
    }
  }

  /**
   * Get all requests.
   * Simulate delayed response by 100ms.
   * @async
   * @returns {Promise<Request[]>} - All requests.
   */
  async getAllRequestsAsync() {
    return new Promise(resolve =>
      setTimeout(() => resolve(this.requests), 500)
    );
  }

  /**
   * Get request by ID.
   * Simulate delayed response by 500ms.
   * @async
   * @param {string} requestId - Request ID.
   * @returns {Promise<Request>} Request with ID matched.
   */
  async getRequestAsync(requestId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (requestId && typeof requestId === 'string' && requestId !== '') {
          const request = this.requests.find(
            request => request.id === requestId
          );

          return request
            ? resolve(request)
            : reject(new Error(`Request with ID "${requestId}" not found. `));
        } else {
          return reject(new Error('Invalid request ID. '));
        }
      }, 500);
    });
  }

  /**
   * Register request.
   * Simulate delayed response by 300ms.
   * @async
   * @param {Request} request - Request to be registered.
   * @returns {Promise<string>} Request ID.
   */
  async registerRequestAsync(request) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.isValidRequest(request)) {
          const requestId = this.getNextRequestId();
          const requests = this.requests;

          requests.push({
            ...request,
            id: requestId,
            createdAt: new Date(),
            createdBy: fakeCreator
          });

          this.requests = requests;

          resolve(requestId);
        } else {
          reject(new Error('Invalid request. '));
        }
      }, 300);
    });
  }

  /**
   * Update request.
   * Simulate delayed response by 500ms.
   * @async
   * @param {Request} request - Request to be updated.
   * @returns {Promise<Request>} Updated request.
   */
  async updateRequestAsync(request) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.isValidRequest(request)) {
          if (request.id) {
            const requestIndex = this.requests.findIndex(
              req => req.id === request.id
            );

            if (requestIndex === -1) {
              return reject(
                new Error(`Request with ID "${request.id}" not found. `)
              );
            }

            const requests = this.requests;
            const previousRequest = requests[requestIndex];
            requests[requestIndex] = {
              ...request,
              createdAt: previousRequest.createdAt,
              createdBy: previousRequest.createdBy,
              updatedAt: new Date(),
              updatedBy: fakeCreator
            };

            this.requests = requests;

            resolve(this.requests[requestIndex]);
          } else {
            return reject(new Error('Invalid request ID'));
          }
        } else {
          return reject(new Error('Invalid request. '));
        }
      }, 500);
    });
  }

  /**
   * Get requests from session storage.
   * @private
   * @returns {Request[]} Requests from session storage.
   */
  get requests() {
    const strRequests = sessionStorage.getItem('requests');

    return strRequests ? JSON.parse(strRequests) : [];
  }

  /**
   * Set requests to session storage.
   * @private
   * @param {Request[]} requests - Requests to be added to session storage.
   */
  set requests(requests) {
    sessionStorage.setItem(
      'requests',
      JSON.stringify(requests && requests.length > 0 ? requests : [])
    );
  }

  /**
   * Get next request ID.
   * @private
   * @example `RF_123`
   * @returns {string} Next request ID.
   */
  getNextRequestId() {
    return `RF_${this.requests.length + 1}`;
  }

  /**
   * Determine if request is valid.
   * A request is considered valid if it contains a title, description and status.
   * @private
   * @param {Request} request - Request object to be validated.
   * @returns {boolean} `true` if request object is valid; `false` otherwise.
   */
  isValidRequest(request) {
    return (
      request &&
      Object.prototype.hasOwnProperty.call(request, 'title') &&
      typeof request.title === 'string' &&
      request.title !== '' &&
      Object.prototype.hasOwnProperty.call(request, 'description') &&
      typeof request.description === 'string' &&
      request.description !== '' &&
      Object.prototype.hasOwnProperty.call(request, 'status') &&
      typeof request.status === 'string' &&
      request.status !== ''
    );
  }
}

const fakeApi = new FakeApi({
  requests: fakeRequests
});

export default fakeApi;
