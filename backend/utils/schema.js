import Joi from  'joi';

export const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const contactSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    mobile: Joi.number().required()
})