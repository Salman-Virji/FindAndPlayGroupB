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
const {
    SignUpSchema,
    SignInSchema,
    ResetPasswordSchema,
} = require('./Validation.controller');

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

/** @TODO - Testing */
//#region SIGN OUT USER
/**
 * @description User Sign Out
 * @route POST http://localhost:3000/auth/sign-in
 * */
const Sign_Out = async (request, response) => {
    const activeSession = await SessionTokenModel.find().sort({ _id: 1 });

    const activeID = activeSession._id;

    activeSession.isActive
        ? await SessionTokenModel.deleteOne({ _id: 1 })
        : response.send('User session not present');

    if (response.session.user) {
        response.session.destroy();
    }

    response.send('User Sign Out').render('signout', { UserSignedOut: activeID });
};
//#endregion

/** @TODO - Testing */
//#region RESET PASSWORD LINK
/**
 * @description Reset Password Request
 * @route POST http://localhost:3000/auth/reset
 * */
const Reset_Password_Request = async (request, response) => {
    try {
        const result = await ResetPasswordSchema.validateAsync(request.body);
    } catch (error) {
        return response.status(409).send(error.details[0].message);
    }

    try {
        const user = await UserModel.findOne({ email: request.body.email });

        if (!user)
            return res.status(400).send("User with given email doesn't exist");

        let token = await ResetPasswordTokenModel.findOne({ userId: user._id });

        if (!token) {
            token = await new ResetPasswordTokenModel({
                userId: user._id,
                token: GenerateToken(),
            }).save();
        }

        const resetTokenLink = `http://localhost:3000/users/${user._id}/${token.token}`;

        await sendPasswordResetEmail(user.email, resetTokenLink);

        res.send('Password reset link sent to your email account');
    } catch (error) {
        res.send('An error occurred');

        console.log(error);
    }
};
//#endregion

/** @TODO - Testing */
//#region UPDATE PASSWORD
/**
 * @description Update Password $id $token
 * @route GET http://localhost:3000/auth/:userId/:token
 * */
const Reset_Password_Page = async (request, response) => {
    try {
        response.render('reset');
    } catch (error) {
        response.send('An error occurred');
        console.log(error);
    }
};
//#endregion

/** @TODO Render password set page and close and Testing */
//#region UPDATE PASSWORD
/**
 * @description Update Password $id $token
 * @route POST http://localhost:3000/auth/:userId/:token
 * */
const Password_Update = async (req, res) => {
    try {
        const result = await PasswordSchema.validateAsync(request.body);
    } catch (error) {
        return response.status(409).send(error.details[0].message);
    }

    try {
        const user = await UserModel.findById(req.params.userId);

        if (!user) return res.status(400).send('Invalid or expired link');

        const token = await ResetPasswordTokenModel.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send('Invalid or expired link');

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save();
        await token.delete();

        /** @TODO Render password set page and close */

        res.send('Password reset sucessfully');
    } catch (error) {
        res.send('An error occurred');
        console.log(error);
    }
};
//#endregion

module.exports = {
    New_Sign_Up,
    Sign_In,
    Sign_Out,
    Reset_Password_Request,
    Reset_Password_Page,
    Password_Update,
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
