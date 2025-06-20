const routes = (handler) => [
  {
    method: 'POST',
    path: '/login',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/logout',
    handler: handler.deleteAuthenticationHandler,
  }
];

module.exports = routes;
