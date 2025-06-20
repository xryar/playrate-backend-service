const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const mapDBToReviews = require('../../utils/index');

class ReviewsService {
  constructor() {
    this._pool = new Pool();
  }

  async addReview(userId, { title, description, coverUrl }) {
    const id = `review-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO reviews (id, user_id, title, description, cover_url) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, userId, title, description, coverUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Review gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllReviews() {
    const result = await this._pool.query('SELECT * FROM reviews');
    return result.rows.map(mapDBToReviews);
  }

  async getReviewById(id) {
    const query = {
      text: 'SELECT * FROM reviews WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan');
    }

    return mapDBToReviews(result.rows[0]);
  }
}

module.exports = ReviewsService;
