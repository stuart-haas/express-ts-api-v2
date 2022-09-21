import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  username: [
    Joi.string().email().required(),
    Joi.string().required(),
  ],
  password: Joi.string().required(),
});

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});
