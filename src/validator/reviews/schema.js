const Joi = require('joi');

const ReviewPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  cover: Joi.any().required().description('File gambar cover game'),
  rating: Joi.number().min(1.0).max(5.0).precision(1).required(),
});

const ImageHeadersSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp', 'image/jpg').required(),
}).unknown();

module.exports = {
  ReviewPayloadSchema,
  ImageHeadersSchema
};
