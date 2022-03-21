const Joi = require('joi');
const { faker } = require('@faker-js/faker');

// const SignUpSchema = Joi.object({
//     username: Joi.string().min(6).max(15).lowercase().required(),
//     email: Joi.string().email().lowercase().required(),
//     password: Joi.string().min(6).required(),
// });

// const payloadSignUp = {
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
// };

// const { error, value } = SignUpSchema.validate(payloadSignUp, {
//     abortEarly: true,
// });
// console.log(error || null);
// console.log(value);

const SignInSchema = Joi.object({
    username: Joi.string().lowercase().required(),
    password: Joi.string().required(),
});

const payloadSignIn = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
};

const { error, value } = SignInSchema.validate(payloadSignIn);
console.log(error || null);
console.log(value);

const ResetPasswordSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
});

const PasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
});
