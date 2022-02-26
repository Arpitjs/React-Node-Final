import Joi from  'joi';

export const userSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
})
.options({ allowUnknown: true });

export const contactSchema = Joi.object({
    name: Joi.string().required().min(5),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    mobile: Joi.number().required()
})
.options({ allowUnknown: true });