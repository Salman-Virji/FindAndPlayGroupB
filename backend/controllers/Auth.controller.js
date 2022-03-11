// const Sign_Out = async (request, response) => response.send('User Sign Out');
// const Reset_Password = async (request, response) =>
//     response.send('User Reset Password');

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses

const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');
const { SignUpSchema } = require('./Validation.controller');

const GenerateToken = require('../utils/generateToken');
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');
const ResetPasswordTokenModel = require('../models/ResetPasswordTokenModel');

/**
 * @description Register a new user
 * @route POST http://localhost:3000/auth/new-signup
 * */
const New_Sign_Up = async (request, response) => {
    try {
        const result = await SignUpSchema.validateAsync(request.body);
        console.log(result);
    } catch (error) {
        return response.status(409).send(error.details[0].message);
    }

    const user = await UserModel.findOne({ email: request.body.email });

    if (user) {
        return response.status(409).send('Account already exists');
    }

    const { username, email } = request.body;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(request.body.password, salt);

    try {
        const newuser = UserModel({ username, email, password });
        await newuser.save();

        /** @TODO Return user ID in json response not object */

        /** 201 Created and successful */
        response.status(201).json({ newuser, success: true });
    } catch (error) {
        const field = Object.keys(error.keyValue);
        const msg = `${field} already exists - ${error.code}`;

        /** 409 Conflict */
        response.status(409).json({
            messege: msg,
            success: false,
        });
    }
};

/**
 * @description User Sign In
 * @route POST http://localhost:3000/auth/sign-in
 * */
const Sign_In = async (request, response) => {
    try {
        const result = await SignInSchema.validateAsync(request.body);
        console.log(result);
    } catch (error) {
        return response.status(422).send({
            ErrorDetails: error.details[0].message,
            Messege: 'Invalid password or email',
        });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
        return response.status(422).send({
            ErrorDetails: error.details[0].message,
            Messege: 'Cannot find user',
        });
    }

    const { password } = request.body;

    try {
        const validation = await bcrypt.compare(password, user.password);
        if (validation) {
            /** @TODO make token */


            res.status(200).send();
        } else {
            data.msg = 'Invalid username or password. Please try again.';
            data.status = false;
            res.send(data);
        }
    } catch (error) {}
};

// router.post('/reset-pass', async (req, res) => {
//     // try {
//     //     const schema = Joi.object({ email: Joi.string().email().required() });
//     //     const { error } = schema.validate(req.body);
//     //     if (error) return res.status(400).send(error.details[0].message);
//     //     const user = await UserModel.findOne({ email: req.body.email });
//     //     if (!user)
//     //         return res.status(400).send("User with given email doesn't exist");
//     //     let token = await ResetPasswordTokenModel.findOne({ userId: user._id });
//     //     if (!token) {
//     //         token = await new ResetPasswordTokenModel({
//     //             userId: user._id,
//     //             token: GenerateToken(),
//     //         }).save();
//     //     }
//     //     const resetTokenLink = `http://localhost:3000/users/${user._id}/${token.token}`;
//     //     await sendPasswordResetEmail(user.email, resetTokenLink);
//     //     res.send('Password reset link sent to your email account');
//     // } catch (error) {
//     //     res.send('An error occurred');
//     //     console.log(error);
//     // }
// });

// router.get('/:userId/:token', async (req, res) => {
//     // try {
//     //     res.sendFile(path.join(__dirname + '/reset.html'));
//     // } catch (error) {
//     //     res.send('An error occurred');
//     //     console.log(error);
//     // }
// });

// router.post('/:userId/:token', async (req, res) => {
//     // try {
//     //     const schema = Joi.object({ password: Joi.string().required() });
//     //     const { error } = schema.validate(req.body);
//     //     if (error) return res.status(400).send(error.details[0].message);
//     //     const user = await UserModel.findById(req.params.userId);
//     //     if (!user) return res.status(400).send('Invalid or expired link');
//     //     const token = await ResetPasswordTokenModel.findOne({
//     //         userId: user._id,
//     //         token: req.params.token,
//     //     });
//     //     if (!token) return res.status(400).send('Invalid or expired link');
//     //     const salt = await bcrypt.genSalt(10);
//     //     user.password = await bcrypt.hash(req.body.password, salt);
//     //     await user.save();
//     //     await token.delete();
//     //     /** @TODO Render password set page and close */
//     //     res.send('Password reset sucessfully');
//     // } catch (error) {
//     //     res.send('An error occurred');
//     //     console.log(error);
//     // }
// });

module.exports = { New_Sign_Up };
