const ReviewsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'reviews',
  version: '1.0.0',
  register: async (server, { reviewsService, storageService, validator }) => {
    const reviewsHandler = new ReviewsHandler(reviewsService, storageService, validator);
    server.route(routes(reviewsHandler));
  }
};
