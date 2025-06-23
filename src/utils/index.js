/* eslint-disable camelcase */
const mapDBToReviews = ({
  id,
  username,
  title,
  description,
  cover_url,
  created_at
}) => ({
  id: id,
  username: username,
  title: title,
  description: description,
  coverUrl: cover_url,
  createdAt: created_at,
});

module.exports = {
  mapDBToReviews
};
