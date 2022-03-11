/** Packages */
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Mongoose Models */
const UserModel = require('../models/UserModel');
const SessionTokenModel = require('../models/SessionTokenModel');
const ResetPasswordTokenModel = require('../models/ResetPasswordTokenModel');

/** Utility and Validation */
const GenerateToken = require('../utils/generateToken');
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');
const { SignUpSchema, SignInSchema } = require('./Validation.controller');

//#region NEW USER SIGN-UP
/**
 * @description Register a new user
 * @route POST http://localhost:3000/auth/new-signup
 * */
const New_Sign_Up = async (request, response) => {
    try {
        const result = await SignUpSchema.validateAsync(request.body);
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
        const newuser = new UserModel({ username, email, password });
        await newuser.save();

        /** 201 Created and successful */
        response.status(201).json({ _id: newuser._id, success: true });
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
//#endregion

//#region SIGN IN USER
/**
 * @description User Sign In
 * @route POST http://localhost:3000/auth/sign-in
 * */
const Sign_In = async (request, response) => {
    try {
        const result = await SignInSchema.validateAsync(request.body);
    } catch (error) {
        return response.status(422).send({
            ErrorDetails: error,
            Messege: 'Invalid password or email',
        });
    }
    const { username, password } = request.body;

    const user = await UserModel.findOne({ username: username });

    if (!user) {
        return response.status(422).send({
            Messege: 'Cannot find user',
        });
    }

    try {
        const validation = await bcrypt.compare(password, user.password);
        if (validation) {
            const sessionJWToken = jwt.sign(
                { userID: user._id },
                process.env.SECRET
            );

            const SessionToken = new SessionTokenModel({
                userID: user._id,
                isActive: true,
                token: sessionJWToken,
            });
            SessionToken.save();

            request.session.user = { SessionToken };
            return response.status(200).send({ SessionToken });
        } else {
            return response.status(422).send({
                ErrorDetails: error,
                Messege: 'Invalid password or email',
            });
        }
    } catch (error) {
        return response.status(422).send({
            ErrorDetails: error,
            Messege: 'Invalid password or email',
        });
    }
};
//#endregion

/** @TODO - Full Method */
//#region SIGN OUT USER
/**
 * @description User Sign Out
 * @route POST http://localhost:3000/auth/sign-in
 * */
const Sign_Out = async (request, response) => {
    /**
     * @TODO
     * 1. Get active user ID or token
     * 2. Check if session is active
     * 3. if active, delete session token and request token
     * 4. Redirect to login.
     */
    response.send('User Sign Out');
};
//#endregion

/** @TODO - Update Syntax and Refs */
//#region RESET PASSWORD LINK
/**
 * @description Reset Password Request
 * @route POST http://localhost:3000/auth/reset
 * */
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
//#endregion

/** @TODO - Update Syntax and Refs */
//#region UPDATE PASSWORD
/**
 * @description Update Password $id $token
 * @route GET http://localhost:3000/auth/:userId/:token
 * */
// router.get('/:userId/:token', async (req, res) => {
//     // try {
//     //     res.sendFile(path.join(__dirname + '/reset.html'));
//     // } catch (error) {
//     //     res.send('An error occurred');
//     //     console.log(error);
//     // }
// });
//#endregion

/** @TODO - Update Syntax and Refs */
//#region UPDATE PASSWORD
/**
 * @description Update Password $id $token
 * @route POST http://localhost:3000/auth/:userId/:token
 * */
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
//#endregion

/** @TODO - Update Exports as other methods are completed. */
module.exports = { New_Sign_Up, Sign_In, Sign_Out };

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
