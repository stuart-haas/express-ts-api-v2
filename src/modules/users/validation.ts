import Joi from 'joi';

export const updateOwnSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateRoleSchema = Joi.object().keys({
  roleId: Joi.number().integer().required(),
});

export const updateCompaniesSchema = Joi.object().keys({
  companies: Joi.array().items(Joi.number().integer().required()).required(),
});
