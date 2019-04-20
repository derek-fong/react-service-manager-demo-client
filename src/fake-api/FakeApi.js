import startCase from 'lodash.startcase';

import { fakeComments, fakeRequests } from './seeds';

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
   * @param {Comment[]} comments - Sample fake comments.
   * @param {Request[]} requests - Sample fake requests.
   */
  constructor({ comments, requests }) {
    // Set comments and requests only if not already defined.
    if (!(this.comments && this.comments.length > 0)) {
      this.comments = comments;
    }

    if (!(this.requests && this.requests.length > 0)) {
      this.requests = requests;
    }
  }

  /**
   * Add comment.
   * Simulate delayed response by 100ms.
   * @async
   * @param {Comment} comment - Comment to be added.
   * @returns {Promise<string>} Comment ID.
   */
  async addCommentAsync(comment) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.isValidComment(comment)) {
          const commentId = this.getNextCommentId();
          const comments = this.comments;

          comments.push({
            ...comment,
            createdAt: new Date(),
            createdBy: fakeCreator,
            id: commentId
          });

          this.comments = comments;

          resolve(commentId);
        } else {
          reject(new Error('Invalid comment. '));
        }
      }, 100);
    });
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
   * Get comments by reference ID, sorted by most recent first.
   * Simulate delayed response by 1000ms.
   * @async
   * @param {string} referenceId - An incident ID or request ID.
   * @returns {Promise<Comment[]>} Comments with reference ID matched.
   */
  async getCommentsAsync(referenceId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          referenceId &&
          typeof referenceId === 'string' &&
          referenceId !== ''
        ) {
          const comments = this.comments.filter(
            comment => comment.referenceId === referenceId
          );

          // REVIEW: Sorting comments by comment ID for demo purpose only; Should be sorted by `createdAt` value in PROD.
          return comments && comments.length > 0
            ? resolve(comments.sort((a, b) => (b.id - a.id ? 1 : -1)))
            : reject(
                new Error(
                  `No comments found with reference ID "${referenceId}". `
                )
              );
        } else {
          return reject(new Error('Invalid reference ID. '));
        }
      }, 1000);
    });
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

          // Add comments for new request.
          this.addComment({
            referenceId: requestId,
            title: 'Created Request',
            description: `${fakeCreator} created request. `,
            createdBy: 'SYSTEM'
          });

          this.addComment({
            referenceId: requestId,
            title: 'Updated Status',
            description: `Request status set as "${startCase(
              request.status.toLowerCase()
            )}". `,
            createdBy: 'SYSTEM'
          });

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
            const currentRequest = {
              ...request,
              createdAt: previousRequest.createdAt,
              createdBy: previousRequest.createdBy,
              updatedAt: new Date(),
              updatedBy: fakeCreator
            };

            requests[requestIndex] = currentRequest;

            this.requests = requests;
            this.addRequestUpdateComments(previousRequest, currentRequest);

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
   * Get comments from session storage.
   * @private
   * @returns {Comment[]} Comments.
   */
  get comments() {
    const strComments = sessionStorage.getItem('comments');

    return strComments ? JSON.parse(strComments) : [];
  }

  /**
   * Set comments to session storage.
   * @private
   * @param {Comment[]} comments - Comments to be updated to session storage.
   */
  set comments(comments) {
    sessionStorage.setItem(
      'comments',
      JSON.stringify(comments && comments.length > 0 ? comments : [])
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

  /**
   * Add comment.
   * @private
   * @param {Comment} comment - Comment to be added.
   */
  addComment(comment) {
    const comments = this.comments;

    comments.push({
      ...comment,
      createdAt: new Date(),
      id: this.getNextCommentId()
    });
    this.comments = comments;
  }

  /**
   * Compare request before and after update. Add comments for updated properties.
   * @private
   * @param {Request} previousRequest - Request before update.
   * @param {Request} currentRequest - Request after update.
   */
  addRequestUpdateComments(previousRequest, currentRequest) {
    const referenceId = currentRequest.id;
    const createdBy = fakeCreator;

    if (previousRequest.title !== currentRequest.title) {
      this.addComment({
        createdBy,
        referenceId,
        title: 'Updated Title',
        description: `Title changed from "${previousRequest.title}" to "${
          currentRequest.title
        }". `
      });
    }

    if (previousRequest.description !== currentRequest.description) {
      this.addComment({
        createdBy,
        referenceId,
        title: 'Updated Description',
        description: `Description changed from "${
          previousRequest.description
        }" to "${currentRequest.description}". `
      });
    }

    if (previousRequest.status !== currentRequest.status) {
      this.addComment({
        createdBy,
        referenceId,
        title: 'Updated Status',
        description: `Status changed from "${startCase(
          previousRequest.status.toLowerCase()
        )}" to "${startCase(currentRequest.status.toLowerCase())}". `
      });
    }
  }

  /**
   * Get next comment ID.
   * @private
   * @example `COMMENT_123`
   * @returns {string} Next comment ID.
   */
  getNextCommentId() {
    return `COMMENT_${this.comments.length + 1}`;
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
   * Determine if comment is valid.
   * A comment is considered valid if it contains a reference ID, title, and description.
   * @private
   * @param comment
   * @returns {*|boolean|string|string}
   */
  isValidComment(comment) {
    return (
      comment &&
      Object.prototype.hasOwnProperty.call(comment, 'referenceId') &&
      comment.referenceId &&
      comment.referenceId !== '' &&
      Object.prototype.hasOwnProperty.call(comment, 'title') &&
      comment.title &&
      comment.title !== '' &&
      Object.prototype.hasOwnProperty.call(comment, 'description') &&
      comment.description &&
      comment.description !== ''
    );
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
  comments: fakeComments,
  requests: fakeRequests
});

export default fakeApi;
