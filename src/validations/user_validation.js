import Joi from 'joi';

  
export const userSchema = Joi.object({
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(0).required(),
    password: Joi.string().min(6).required(),
});