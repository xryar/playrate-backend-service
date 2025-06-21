const users = require('../api/users');
const authentications = require('../api/authentications');
const AuthenticationsService = require('../services/postgres/AuthenticationsService');
const UsersService = require('../services/postgres/UsersService');
const TokenManager = require('../tokenize/TokenManager');
const UsersValidator = require('../validator/users');
const AuthenticationsValidator = require('../validator/authentications');
const reviews = require('../api/reviews');
const ReviewsService = require('../services/postgres/ReviewsService');
const StorageService = require('../services/storage/StorageService');
const path = require('path');
const ReviewsValidator = require('../validator/reviews');

const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();
const reviewsService = new ReviewsService();
const storageService = new StorageService(path.resolve(process.cwd(), 'src/api/reviews/file/images'));

module.exports = [
  {
    plugin: users,
    options: {
      service: usersService,
      validator: UsersValidator
    }
  },
  {
    plugin: authentications,
    options: {
      authenticationsService,
      usersService,
      tokenManager: TokenManager,
      validator: AuthenticationsValidator,
    }
  },
  {
    plugin: reviews,
    options: {
      reviewsService,
      storageService,
      validator: ReviewsValidator,
    }
  }
];