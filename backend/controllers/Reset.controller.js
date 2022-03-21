/** Packages */
const bcrypt = require('bcrypt');

/** Mongoose Models / Schema */
const User = require('../models/User.model');
const ResetToken = require('../models/ResetToken.model');

/** Utility and Validation */
const GenerateToken = require('../utils/generateToken');
const { EmailSchema, PasswordSchema } = require('./Validation.controller');

const sendResetLink_GMAIL = require('../utils/sendResetEmail_gmail');
const sendResetLink_ETHEREAL = require('../utils/sendResetEmail_ethereal');

/** @description VIEW Renders Password_Reset_Page */
const Password_Reset_Page = async (request, response) =>
    response.render('reset');
    
/** @description VIEW Renders Password_Update_Page */
const Password_Update_Page = async (request, response) =>
    response.render('update');

/**
 * @description Password_Reset_Request
 * @route POST http://localhost:3000/auth/reset-password
 * @TODO - Tested and Working! Check ethereal link in console!
 * */
const Password_Reset_Request = async (request, response) => {
    //#region RESET PASSWORD LINK
    const email = request.body.email;

    try {
        const { error } = await EmailSchema.validate(request.body);
        if (error) throw new Error(error.message.replace(/\"/g, ''));

        const user = await User.findOne({ email: email });
        if (!user) throw new Error('Email does not exist!');

        const Reset_token = await ResetToken.findOne({ reset_id: user._id });

        if (!Reset_token) {
            newToken = await new ResetToken({
                reset_id: user._id,
                reset_token: GenerateToken(),
            }).save();
        }

        const resetURL = `http://localhost:3000/auth/reset-password/${newToken.reset_id}/${newToken.reset_token}`;

        /** @param PRODUCTION - limit of 100 emails per day! */
        // await sendResetLink_GMAIL(user.email, resetURL);

        /** @param DEVELOPMENT - unlimited */
        await sendResetLink_ETHEREAL(user.email, resetURL);

        //#endregion
        response.status(200).json({
            data: {
                msg: 'Password reset link sent to your email account',
                link: resetURL,
                location: 'TRY - Reset Password End',
                success: true,
            },
        });
    } catch (error) {
        response.status(400).json({
            data: {
                error: error.message,
                location: 'CATCH - Reset Password',
                success: false,
            },
        });
    }
};

/**
 * @description Password_Update $id $token
 * @route POST http://localhost:3000/auth/reset-password/:userId/:token
 * @TODO Testing - Working but the password script is allowing for empty string. Need to fix this.
 * */
const Password_Update_Request = async (request, response) => {
    //#region UPDATE PASSWORD
    const password = request.body.password;

    try {
        const { error } = await PasswordSchema.validate(request.body);
        if (error) throw new Error(error.message.replace(/\"/g, ''));

        const user = await User.findById(request.params.id);
        if (!user) throw new Error('Error with reset link, please try again!');

        const Reset_token = await ResetToken.findOne({
            reset_id: request.params.id,
            reset_token: request.params.token,
        });
        if (!Reset_token) throw new Error('Invalid or expired link');

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        await Reset_token.delete();

        //#endregion
        response.status(200).render('success', { username: user.username });
    } catch (error) {
        response.status(400).json({
            data: {
                error: error.message,
                location: 'CATCH - Reset Link Password',
                success: false,
            },
        });
    }
};

module.exports = {
    Password_Reset_Request,
    Password_Update_Request,
    Password_Update_Page,
    Password_Reset_Page,
};
