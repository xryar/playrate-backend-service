const autoBind = require('auto-bind');
const config = require('../../utils/config');

class ReviewsHandler {
  constructor(reviewsService, storageService, validator) {
    this._reviewsService = reviewsService;
    this._storageService = storageService;
    this._validator = validator;

    autoBind(this);
  }

  async postReviewHandler(request, h) {
    this._validator.validateReviewPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { title, description, cover } = request.payload;
    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const fileLocation = `http://${config.app.host}:${config.app.port}/reviews/images/${filename}`;

    const newReview = await this._reviewsService.addReview(credentialId, { title, description, coverUrl: fileLocation });

    const response = h.response({
      status: 'success',
      message: 'Review Anda berhasil ditambahkan',
      data: {
        newReview
      }
    });
    response.code(201);
    return response;
  }
}

module.exports = ReviewsHandler;
