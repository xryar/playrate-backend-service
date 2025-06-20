const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const { fullname, username, password } = request.payload;

    const userId = await this._service.addUser({ fullname, username, password });

    const response = h.response({
      status: 'success',
      message: 'Registrasi Berhasil',
      data: {
        userId
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
