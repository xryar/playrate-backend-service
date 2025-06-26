const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToReviews } = require('../../utils/index');

class ReviewsService {
  constructor() {
    this._pool = new Pool();
  }

  async addReview(userId, { title, description, coverUrl }) {
    const id = `review-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO reviews (id, user_id, title, description, cover_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [id, userId, title, description, coverUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Review gagal ditambahkan');
    }

    return mapDBToReviews(result.rows[0]);
  }

  async getAllReviews() {
    const query = {
      text: `SELECT reviews.*, users.username
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      ORDER BY reviews.created_at DESC`
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapDBToReviews);
  }

  async getReviewById(id) {
    const query = {
      text: `SELECT reviews.*, users.username
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      WHERE reviews.id = $1
      ORDER BY reviews.created_at DESC`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan');
    }

    return mapDBToReviews(result.rows[0]);
  }

  async getReviewByUserId(userId) {
    const query = {
      text: `SELECT reviews.*, users.username
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      WHERE reviews.user_id = $1
      ORDER BY reviews.created_at DESC`,
      values: [userId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan');
    }

    return result.rows.map(mapDBToReviews);
  }

  async deleteReviewById(id) {
    const query = {
      text: 'DELETE FROM reviews WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Review Gagal dihapus, Id tidak ditemukan');

    }
  }
}

module.exports = ReviewsService;
