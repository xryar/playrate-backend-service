/* eslint-disable camelcase */
const mapDBToReviews = ({
  id,
  username,
  title,
  description,
  cover_url,
  created_at,
  rating,
}) => ({
  id: id,
  username: username,
  title: title,
  description: description,
  coverUrl: cover_url,
  createdAt: created_at,
  rating: rating,
});

module.exports = {
  mapDBToReviews
};
