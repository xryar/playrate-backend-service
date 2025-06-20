/* eslint-disable camelcase */
const mapDBToReviews = ({
  id,
  user_id,
  title,
  description,
  cover_url,
  created_at
}) => ({
  id: id,
  userId: user_id,
  title: title,
  description: description,
  coverUrl: cover_url,
  createdAt: created_at,
});

module.exports = {
  mapDBToReviews
};
