const users = require('../api/users');
const UsersService = require('../services/postgres/UsersService');
const UsersValidator = require('../validator/users');

const userService = new UsersService();

module.exports = [
  {
    plugin: users,
    options: {
      service: userService,
      validator: UsersValidator
    }
  }
];