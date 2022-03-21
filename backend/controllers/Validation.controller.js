const Joi = require('joi');

const SignUpSchema = Joi.object({
    username: Joi.string().min(6).lowercase().alphanum().trim().required(),
    password: Joi.string().min(6).trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
});

const SignInSchema = Joi.object({
    username: Joi.string().min(6).lowercase().alphanum().trim().required(),
    password: Joi.string().min(6).trim().required(),
});

const EmailSchema = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
});

const PasswordSchema = Joi.object({
    password: Joi.string().min(6).trim().required(),
});

module.exports = {
    SignUpSchema,
    SignInSchema,
    EmailSchema,
    PasswordSchema,
};
