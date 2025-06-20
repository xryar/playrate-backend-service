const InvariantError = require('../../exceptions/InvariantError');
const { ReviewPayloadSchema, ImageHeadersSchema } = require('./schema');

const ReviewsValidator = {
  validateReviewPayload: (payload) => {
    const validationResult = ReviewPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateImageHeaders: (headers) => {
    const validationResult = ImageHeadersSchema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = ReviewsValidator;
