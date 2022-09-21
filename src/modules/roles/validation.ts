import Joi from 'joi';

export const defaultSchema = Joi.object().keys({
  name: Joi.string().required(),
});
