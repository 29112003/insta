const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profilePicture: Joi.optional(), // Optional, no specific type needed for buffer
    bio: Joi.string().max(200).optional(), // Optional, limited to 200 characters
    followers: Joi.array().optional(), // Optional, an array of followers
    following: Joi.array().optional(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
