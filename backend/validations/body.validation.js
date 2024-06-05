const Joi = require("joi");

const validateLoginData = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateRegisterData = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateUploadData = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = {
  validateLoginData,
  validateRegisterData,
  validateUploadData,
};
