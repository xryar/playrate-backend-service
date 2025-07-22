const routes = (handler) => [
  {
    method: 'POST',
    path: '/login',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/login',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/logout',
    handler: handler.deleteAuthenticationHandler,
  }
];

module.exports = routes;
