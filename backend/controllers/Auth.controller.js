/** Packages */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Mongoose Models */
const UserModel = require('../models/UserModel');
const SessionTokenModel = require('../models/SessionTokenModel');
const ResetPasswordTokenModel = require('../models/ResetPasswordTokenModel');

/** Utility and Validation */
const GenerateToken = require('../utils/generateToken');
const {
    SignUpSchema,
    SignInSchema,
    ResetPasswordSchema,
    PasswordSchema,
} = require('./Validation.controller');

const sendResetLink_GMAIL = require('../utils/sendResetEmail_gmail');
const sendResetLink_ETHEREAL = require('../utils/sendResetEmail_ethereal');

//#region NEW USER SIGN-UP
/**
 * @description Register a new user
 * @route POST http://localhost:3000/auth/new-signup
 * */
const New_Sign_Up = async (request, response) => {
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    /** @TODO - Fix some issues with this */
    /** Handle Errors - Data Validation */
    // try {
    //     const value = await SignInSchema.validateAsync({
    //         username: username,
    //         email: email,
    //         password: password,
    //     });
    // } catch (err) {
    //     return response.status(401).json({
    //         data: 'Data Validation Error',
    //         success: false,
    //         loc: 'validatation catch',
    //         err: err.details,
    //     });
    // }

    /** Handle Errors - User Already Exists */
    const userExists = await UserModel.findOne({ email: email });
    if (userExists)
        return response.status(401).json({
            data: 'Username or Password Already Exists',
            success: false,
            loc: 'dupilcate user if',
        });

    /** Create User, Hash Password and Save */
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(request.body.password, salt);

        const newuser = new UserModel({
            username: request.body.username,
            email: request.body.email,
            password: password,
        });
        await newuser.save();

        response
            .status(201)
            .json({ data: newuser, success: true, loc: 'end try sign up' });
    } catch (error) {
        response.status(403).json({
            data: error.message,
            success: false,
            loc: 'sign up catch',
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
    const username = request.body.username;
    const password = request.body.password;

    try {
        /** Handle Errors - Data Validation */
        const error = SignInSchema.validate(request.body);
        if (error)
            return response.status(403).json({
                data: 'Username or Email could not be validated',
                success: false,
                loc: 'validation if',
            });

        /** Handle Errors - Username does not exist */
        const user = await UserModel.findOne({ username: username });
        if (!user)
            response.status(403).json({
                data: 'Username or Email does not exist',
                success: false,
                loc: 'username not found if',
            });

        // /** Handle Errors - Username has an active session */
        // const userSignedIn = await SessionTokenModel.findOne({ userID: user._id });
        // // response.json({user: userSignedIn});

        // if (userSignedIn)
        //     return response
        //         .status(403)
        //         .json({ data: 'User is already signed in!', success: false });

        /** Sign In User, Compare Passwords, Generate JWT and Save */

        const validation = await bcrypt.compare(
            request.body.password,
            user.password
        );

        /** Generate JsonWebToken */
        if (validation) {
            const JWToken = jwt.sign({ userID: user._id }, process.env.SECRET);

            /** Set JWT to mongoDB and save */
            const SessionToken = new SessionTokenModel({
                userID: user._id,
                isActive: true,
                token: JWToken,
            });
            SessionToken.save();

            /** Express Sessions */
            request.session.user = { SessionToken };
            return response.status(200).json({ data: JWToken, success: true });
        }
    } catch (error) {
        return response
            .status(403)
            .json({ data: error.message, success: false, loc: 'catch' });
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

        await SessionTokenModel.deleteOne({ userID: _id });

        if (request.session) {
            request.session.destroy();
        }

        response.send({
            userID: _id,
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
        const { error } = await ResetPasswordSchema.validateAsync(request.body);
        if (error) {
            return response.status(409).send(error.message);
        }

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

        const resetURL = `http://localhost:3000/auth/reset-password/${user._id}/${token.token}`;

        /** @param PRODUCTION - limit of 100 emails per day! */
        await sendResetLink_GMAIL(user.email, resetURL);

        /** @param DEVELOPMENT - unlimited */
        // await sendResetLink_ETHEREAL(user.email, resetURL);

        response.send({
            msg: 'Password reset link sent to your email account',
            link: resetURL,
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
