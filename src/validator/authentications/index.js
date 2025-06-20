const InvariantError = require('../../exceptions/InvariantError');
const { LoginPayloadSchema, LogoutPayloadSchema } = require('./schema');

const AuthenticationsValidator = {
  validateLoginPayload: (payload) => {
    const validationResult = LoginPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateLogoutPayload: (payload) => {
    const validationResult = LogoutPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = AuthenticationsValidator;