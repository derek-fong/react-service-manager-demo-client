import { fakeRequests } from './seeds';

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
}

const fakeApi = new FakeApi({
  requests: fakeRequests
});

export default fakeApi;
