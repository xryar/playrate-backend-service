const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/reviews',
    handler: handler.postReviewHandler,
    options: {
      auth: 'playrate_jwt',
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      }
    }
  },
  {
    method: 'GET',
    path: '/reviews',
    handler: handler.getReviewsHandler,
    options: {
      auth: 'playrate_jwt',
    }
  },
  {
    method: 'GET',
    path: '/reviews/{id}',
    handler: handler.getReviewByIdHandler,
    options: {
      auth: 'playrate_jwt',
    }
  },
  {
    method: 'GET',
    path: '/reviews/my-reviews',
    handler: handler.getMyReviews,
    options: {
      auth: 'playrate_jwt',
    }
  },
  {
    method: 'GET',
    path: '/users/{userId}/reviews',
    handler: handler.getReviewByUserIdHandler,
    options: {
      auth: 'playrate_jwt',
    }
  },
  {
    method: 'DELETE',
    path: '/reviews/{id}',
    handler: handler.deleteReviewByIdHandler,
    options: {
      auth: 'playrate_jwt',
    }
  },
  {
    method: 'GET',
    path: '/reviews/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      }
    },
    options: {
      auth: false,
      cors: {
        origin: ['*'],
      }
    }
  }
];

module.exports = routes;
