/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('reviews', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true
    },
    cover_url: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP WITH TIME ZONE',
      default: pgm.func('CURRENT_TIMESTAMP'),
      notNull: true,
    }
  });

  pgm.addConstraint('reviews', 'fk_reviews_user_id.user.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('reviews');
};
