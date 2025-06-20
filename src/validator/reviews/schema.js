const Joi = require('joi');

const ReviewPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  cover: Joi.any().required().description('File gambar cover game')
});

const ImageHeadersSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp', 'image/jpg').required(),
}).unknown();

module.exports = {
  ReviewPayloadSchema,
  ImageHeadersSchema
};
