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
    PasswordSchema,
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

/** @TODO - Testing and clean up */
//#region SIGN OUT USER
/**
 * @description User Sign Out
 * @route POST http://localhost:3000/auth/sign-in
 * */
const Sign_Out = async (request, response) => {
    try {
        const { _id } = request.body;
        const activeSession = await SessionTokenModel.find().sort({ _id: 1 });
        const { token } = activeSession[0];
        const user = await UserModel.findOne({ _id });
        const { username } = user;

        /** @TODO - Clean up and delete from db too! */
        // activeSession.isActive
        //     ? await SessionTokenModel.deleteOne({ _id: 1 })
        //     : response.send('User session not present');

        //await activeSession.delete();

        if (request.session) {
            request.session.destroy();
        }

        response.send({
            userid: _id,
            username: username,
            sessionMongo: token || 'No Token',
            messageMongo: 'User has been signed out',
            sessionExpress: request.session || 'ExpressSession Ended',
        });
    } catch (error) {
        response.send({
            Error: error.message,
            sessionExpress: request.session || 'ExpressSession Ended',
        });
    }
};
//#endregion

/** @TODO - Testing */
//#region RESET PASSWORD LINK
/**
 * @description Password_Reset_Request
 * @route POST http://localhost:3000/auth/reset-password
 * */
const Password_Reset_Request = async (request, response) => {
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

        const resetTokenLink = `http://localhost:3000/auth/reset-password/${user._id}/${token.token}`;

        await sendPasswordResetEmail(user.email, resetTokenLink);

        response.send({
            msg: 'Password reset link sent to your email account',
            link: resetTokenLink,
        });
    } catch (error) {
        response.send('An error occurred');

        console.log(error);
    }
};
//#endregion

/** @TODO - Testing */
//#region UPDATE PASSWORD FORM
/**
 * @description Renders Password_Update_Page
 * @route GET http://localhost:3000/auth/reset-password/:userId/:token
 * */
const Password_Update_Page = async (request, response) => {
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
 * @description Password_Update $id $token
 * @route POST http://localhost:3000/auth/reset-password/:userId/:token
 * */
const Password_Update = async (request, response) => {
    try {
        const { error } = await PasswordSchema.validateAsync(request.body);

        if (error) return response.status(400).send(error.message);

        const user = await UserModel.findById(request.params.id);

        const token = await ResetPasswordTokenModel.findOne({
            userId: user.id,
            token: request.params.token,
        });

        if (!token) return response.status(400).send('Invalid or expired link');

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(request.body.password, salt);

        await user.save();
        await token.delete();

        /** @TODO Render password set page and close */

        response.send({
            messege: 'Password reset successfully',
            raw: request.body.password,
            hashed: user.password,
        });
    } catch (error) {
        response.send('An error occurred');
        console.log(error);
    }
};
//#endregion

module.exports = {
    New_Sign_Up,
    Sign_In,
    Sign_Out,
    Password_Reset_Request,
    Password_Update_Page,
    Password_Update,
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
