const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

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
}

module.exports = ReviewsService;
