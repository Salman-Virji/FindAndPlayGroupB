/** Packages */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Mongoose Models / Schema */
const User = require('../models/User.model');
const SessionToken = require('../models/SessionToken.model');

/** Utility and Validation */
const { SignUpSchema, SignInSchema } = require('./Validation.controller');

/**
 * @description Register a new user
 * @route POST http://localhost:3000/auth/new-signup
 * @summary Passing Tests - see testing/signup.test.md
 * */
const New_Sign_Up = async (request, response) => {
    //#region NEW USER SIGN-UP
    const username = request.body.username;
    const email = request.body.email;
    let password = request.body.password;

    try {
        /** Handle Errors - Data Validation */
        const { error } = await SignUpSchema.validate({
            username: username,
            email: email,
            password: password,
        });
        if (error) throw new Error(error.message.replace(/\"/g, ''));

        /** Handle Errors - User Already Exists */
        const userExists = await User.findOne({ email: email });
        if (userExists) throw new Error('Username or Password Already Exists');

        /** Create User, Hash Password and Save */
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const newuser = new User({
            username: request.body.username,
            email: request.body.email,
            password: password,
        });
        await newuser.save();
        //#endregion

        response.status(200).json({
            data: {
                msg: newuser.id,
                location: 'TRY - Sign Up End',
                success: true,
            },
        });
    } catch (error) {
        response.status(400).json({
            data: {
                error: error.message,
                location: 'CATCH - New Sign Up',
                success: false,
            },
        });
    }
};

/**
 * @description User Sign In
 * @route POST http://localhost:3000/auth/sign-in
 * @summary Passing Tests - But need to look into express-session, I don't think it's needed.
 * */
const Sign_In = async (request, response) => {
    //#region SIGN IN USER
    const username = request.body.username;
    let password = request.body.password;
    console.log('HERE')

    try {
        /** Handle Errors - Data Validation
         * @note option > { abortEarly: false } will return
         * all the validation errors not just the first
         */
        const { error } = await SignInSchema.validate(request.body, {
            abortEarly: false,
        });
        if (error) throw new Error(error.message.replace(/\"/g, ''));

        /** Handle Errors - Username does not exist */
        const userExists = await User.findOne({ username: username });
        if (!userExists) throw new Error('Username or Email does not exist!');

        /** Handle Errors - Username has an active session */
        const activeUserSession = await SessionToken.findOne({
            session_id: userExists.id,
        });
        if (activeUserSession) throw new Error('User already signed in!');

        /** Compare Passwords */
        const validation = await bcrypt.compare(password, userExists.password);
        if (!validation) throw new Error('Password Authentication failed!');

        /** Generate JsonWebToken */
        const payload = userExists._id;
        const JWToken = jwt.sign({ payload }, process.env.SECRET, {
            expiresIn: '2h',
        });

        /** Set JWT to mongoDB and save */
        const sessionToken = new SessionToken({
            session_id: payload,
            session_jwt: JWToken,
        });
        sessionToken.save();

        /** Set Express Session */
        request.session.user = sessionToken;

        /** @TODO - Not sure we really need this */
        /** Send newSession to frontend to store as kpv */
        // const newSession = await SessionToken.findOne({
        //     session_id: userExists._id,
        // });
        // if (newSession) throw new Error('Cannot find session!');

        //#endregion

        response.status(200).json({
            data: {
                msg: sessionToken._id,
                location: 'TRY - Sign In End',
                success: true,
            },
        });
    } catch (error) {
        response.status(400).json({
            data: {
                error: error.message,
                location: 'CATCH - Sign In',
                success: false,
            },
        });
    }
};

/**
 * @description User Sign Out
 * @route POST http://localhost:3000/auth/sign-in
 * @TODO - Passing Tests - Need to clean and make clear comments
 * */
const Sign_Out = async (request, response) => {
    //#region SIGN OUT USER

    // This is the user id equal to SessionToken _id
    const id = request.body.id;

    try {
        const activeUserSession = await SessionToken.findOne({
            _id: id,
        });

        if (!activeUserSession) {
            return response.status(200).json({
                data: {
                    msg: `${id} is not signed in!`,
                    redirect: '/sign-in',
                    success: true,
                    location: 'TRY - Check For Session - Not found',
                },
            });
        }

        await SessionToken.deleteOne({ _id: id });
        console.log('Deleted');

        if (request.session) {
            request.session.destroy();
        }

        //#endregion
        response
            .status(200)
            // .json({
            //     data: {
            //         msg: `${id} has been signed out!`,
            //         redirect: '/sign-in',
            //         location: 'TRY - Sign Out End',
            //         success: true,
            //     },
            // })
            .render('signout', { username: id });
    } catch (error) {
        response.status(401).json({
            data: {
                error: error.message,
                location: 'CATCH - Sign Out',
                success: false,
            },
        });
    }
};

/**
 * @description User Sign Out
 * @route POST http://localhost:3000/auth/RefreshToken
 * @TODO - Write Method
 * */
const ValidateToken = async (request, response) => {
    //#region Validate / Refresh Token
    const authorization = request.header.authorization;
    try {
        /**
         * 1. Get BEARER token
         * 2. Check DB for sessionToken
         * 3. Verify JWT on sessionToken
         * 4. Return boolean to change KPV on frontend. 
         */

        //#endregion
        response.status(200).json({
            data: {
                msg: `Validate Token`,
                location: 'TRY - Validate Token End',
                success: true,
            },
        });
    } catch (error) {
        response.status(401).json({
            data: {
                error: error.message,
                location: 'CATCH - Validate Token',
                success: false,
            },
        });
    }
};

module.exports = {
    New_Sign_Up,
    Sign_In,
    Sign_Out,
    ValidateToken,
};
