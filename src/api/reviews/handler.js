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

  async getReviewsHandler(request, h) {
    const reviews = await this._reviewsService.getAllReviews();
    const response = h.response({
      status: 'success',
      message: 'Berhasil mengambil Review',
      data: {
        reviews
      },
    });
    response.code(200);
    return response;
  }

  async getReviewByIdHandler(request, h) {
    const { id } = request.params;
    const review = await this._reviewsService.getReviewById(id);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mengambil Review',
      data: {
        review
      },
    });
    response.code(200);
    return response;
  }

  async getMyReviews(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const reviews = await this._reviewsService.getReviewByUserId(credentialId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mengambil Review',
      data: {
        reviews
      }
    });
    response.code(200);
    return response;
  }

  async getReviewByUserIdHandler(request, h) {
    const { userId } = request.params;
    const reviews = await this._reviewsService.getReviewByUserId(userId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mengambil Review',
      data: {
        reviews
      }
    });
    response.code(200);
    return response;
  }

  async deleteReviewByIdHandler(request, h) {
    const { id } = request.params;
    await this._reviewsService.deleteReviewById(id);

    return h.response({
      status: 'success',
      message: 'Review Berhasil dihapus'
    });
  }
}

module.exports = ReviewsHandler;
