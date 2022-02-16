//Node.js module for password hashing
const router = require('express').Router();
//Middleware to create modular, mountable route handlers

//Node.js module that performs data encryption and decryption
const crypto = require("crypto");

//Joi module validates the data based on schemas (we build schemas to validate JavaScript objects)
const Joi = require('joi');

//For salting passwords. Maybe we could use bcrypt.
const bcrypt = require('bcrypt');

// const md5 = require('md5'); << No longer using, all BCrypt

// These are the database models we are using to make instances in this router. 
const UserModel = require('../models/UserModel');
const ResetPasswordTokenModel = require('../models/ResetPasswordTokenModel');

const sendEmail = require('../utils/sendEmail');

/* 
1. BCRYPT is set and working for sign in and login. - Jody Weds
2. Made some changes to names and structure to be more performant. The can still be refined.
3. TRIM() username and set email to lower case on sign up and login finds, maybe use Joi api for that? 
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
                // SET SESSION TOKEN IN DB
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

        let token = await ResetPasswordTokenModel.findOne({ userId: user._id });

        if (!token) {
            token = await new ResetPasswordTokenModel({
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
1. /reset-pass = sets reset token and calls email method
2. /:userId/:token = as coded was post, but we need to server a html or app screen here and THEN post with the code below. 
3. I have coded an example below, I see there is an ejs file, maybe that was the intention. 

 */

// Basic working example of my comments...

const path = require('path')

router.get('/:userId/:token', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname+'/reset.html'));
    } catch (error) {
        res.send('An error occured');
        console.log(error);
    }
});

router.post('/:userId/:token', async (req, res) => {
    console.log('ERROR HERE..... wrong route!');
    try {
        const schema = Joi.object({ password: Joi.string().required() });

        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        console.log('1');
        
        const user = await UserModel.findById(req.params.userId);
        if (!user) return res.status(400).send('Invalid link or expired');
        
        console.log('2');

        const token = await ResetPasswordTokenModel.findOne({
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