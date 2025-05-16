import Joi from 'joi';

export const roleSchema = Joi.object({
    name: Joi.string().valid('admin', 'user').required(),
  });