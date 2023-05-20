const Joi = require("joi");

const createValidateSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean(),
});

const updateValidateSchema = Joi.object()
  .keys({
    name: createValidateSchema.extract("name").optional(),
    email: createValidateSchema.extract("email").optional(),
    phone: createValidateSchema.extract("phone").optional(),
    favorite: createValidateSchema.extract("favorite").optional(),
  })
  .or("name", "email", "phone", "favorite");

const schemaForUpdateFavorite = Joi.object()
  .keys({
    favorite: createValidateSchema.extract("favorite").optional(),
  })
  .or("favorite");

module.exports = {
  createValidateSchema,
  updateValidateSchema,
  schemaForUpdateFavorite,
};
