const Joi = require('joi');

const SignUpSchema = Joi.object({
    username: Joi.string().min(6).max(15).alphanum().lowercase().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

const SignInSchema = Joi.object({
    username: Joi.string().lowercase().required(),
    password: Joi.string().required(),
});

module.exports = { SignUpSchema, SignInSchema };
