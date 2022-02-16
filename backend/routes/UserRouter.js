const router = require('express').Router();

//For salting passwords. Maybe we could use bcrypt.
const bcrypt = require('bcrypt');
const md5 = require('md5');

const UserModel = require('../models/UserModel');

/* Not in use in this file, but the JWT can be used in token methods */
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'sdfnsdl;jgn;sdgn;';
// const nodemailer = require('nodemailer');

const Token = require('../models/TokenModel');
const crypto = require('crypto');
const Joi = require('joi');

const sendEmail = require('../utils/sendEmail');

/* 
1. BCRYPT is set and working for sign in and login. - Jody Weds
2. Made some changes to names and structure to be more performant. The can still be refined.
*/

/******************************
 **** BASE ROUTE *****
 ******************************/
router.route('/').get((req, res) => {
    res.send('🙂 UserModel Route Connected 🙂');
});

/******************************
 **** USER SIGN UP ROUTE *****
 ******************************/
router.route('/signup').post(async (req, res) => {
    // Creating variables to store in newUser object
    const username = req.body.username.toLowerCase();
    const email = req.body.email.toLowerCase();

    /* BCrypt Hashing */
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = UserModel({ username, email, password });

    const data = {
        msg: '',
        status: false,
    };

    // If successfull, user will be added, otherwise it will display an error

    /* NOTE: We need to use middleware to check the input entry for sanitation and duplicate entry username/email...So that would mean is the username at least 6 chars or password is strong and email is valid email etc. This is simple to work in here.
     */

    newUser
        .save()
        .then(() => {
            data.msg = `New User ${newUser.username} added`;
            data.status = true;
            res.json(data);
        })
        .catch((err) => {
            data.msg = 'Error: ' + err;
            data.status = false;
            res.send(data);
        });
});
/**** END OF SIGN UP ****/

/*************************************
 **** USER LOGIN / SIGN IN ROUTE *****
 *************************************/
router.route('/login').post(async (req, res) => {
    const username = req.body.username.toLowerCase();
    const rawPassword = req.body.password;

    const data = {
        msg: '',
        status: false,
    };

    //Finding an user by username
    UserModel.findOne({ username: username })
        .then(async (result) => {
            //If 'Either' of the fields are empty, the user will be asked to complete them
            if (username == '' || rawPassword == '') {
                data.msg = 'Please complete all fields';
                res.send(data);
                return;
            }

            /* The user is 'authenticated', we will have to redirect and set cookie.*/
            /* BCrypt Hash Unwrap */
            const validation = await bcrypt.compare(
                rawPassword,
                result.password
            );

            if (validation) {
                data.msg = `${username} AUTHENTICATED - SET SESSION TOKEN AND SEND USER TO MAIN AREA OF APP`;
                data.status = true;
                res.send(data);
            } else {
                data.msg = 'Invalid Login, Try again';
                data.status = false;
                res.send(data);
            }
        })
        .catch((err) => {
            data.msg = `User Not Found, ${err.message}`;
            data.status = false;
            res.send(data);
        });
});
/**** END OF SIGN IN / LOGIN ****/

// Unsure of what this code is doing, plus is written different to code above?
/*
 **** RESET PASSWORD TOKEN ROUTE *****
 */
router.post('/reset-pass', async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await UserModel.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });

        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save();
        }

        const link = `localhost:3000/users/${user._id}/${token.token}`;
        console.log(link);
        await sendEmail(user.email, 'Password reset', link);

        res.send('password reset link sent to your email account');
    } catch (error) {
        res.send('An error occured');
        console.log(error);
    }
});

/**** END OF RESET PASSWORD TOKEN ****/

/*
 **** RESET PASSWORD ROUTE? *****   
 I changed this to a get request, this is where the page should be served. The next route would do the logic below? 
 */
router.get('/:userId/:token', async (req, res) => {
    console.log('pre-try');
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        console.log('1');
        
        const user = await UserModel.findById(req.params.userId);
        if (!user) return res.status(400).send('Invalid link or expired');
        
        console.log('2');

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send('Invalid link or expired');
        
        console.log('3');
        
        /* BCrypt Hashing */
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        
        console.log('4');

        await user.save();
        await token.delete();

        res.send('password reset sucessfully.');
    } catch (error) {
        res.send('An error occured');
        console.log(error);
    }
});

module.exports = router;
