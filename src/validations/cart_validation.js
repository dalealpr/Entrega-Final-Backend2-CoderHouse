import Joi from 'joi';

const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'ObjectId validation');
  

export const cartSchema = Joi.object({
    products: Joi.array().items(
      Joi.object({
        quantity: Joi.number().min(1).default(1),
        product: objectId.required()
      })
    ).required()
  });