import Joi from 'joi';

export const ticketSchema = Joi.object({
    code: Joi.string().required(),
    purchase_datetime: Joi.string().required(), 
    amount: Joi.number().min(0).required(),
    purchaser: Joi.string().required(),
  
    status: Joi.string()
      .valid('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'failed')
      .default('pending'),
  });