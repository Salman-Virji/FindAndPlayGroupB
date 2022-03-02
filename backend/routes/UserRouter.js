//Middleware to create modular, mountable route handlers
const router = require('express').Router();

//Node.js module that performs data encryption and decryption
const crypto = require('crypto');

//Joi module validates the data based on schemas (building schemas to validate JavaScript objects)
const Joi = require('joi');

//For salting passwords
const bcrypt = require('bcrypt');

// Reset password middleware, edited name to be more discriptive.
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');

// These are the database models we are using to make instances in this router
const UserModel = require('../models/UserModel');
const ResetPasswordTokenModel = require('../models/ResetPasswordTokenModel');

/*===========================================================*/
// @ Thomas / Agyapal
const SessionTokenModel = require('../models/SessionTokenModel');

router.route('/session/:id').post((req, res) => {
    // post new token after login...
});

router.route('/session/:id').get((req, res) => {
    // get or check if valid session token...
});

/*===========================================================*/
// @ Jody / Arianne
router.route('/logout/:id').post((req, res) => {
    // Delete session token if it exists
});

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
                // SET SESSION TOKEN IN DB  middleware function to set session cookie.
                data.msg = `${username} AUTHENTICATED - SET SESSION TOKEN AND SEND USER TO MAIN AREA OF APP`;
                data.status = true;
                res.send(data);
            } else {
                data.msg = 'Invalid Login. Try again';
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

router.route('/session/:id').get((req, res) => {
    // get or check if valid session token...
    try {
        //ISSUE - How to call the model??
        if (req.header.SessionTokenModel) {
            const token = req.header.SessionTokenModel.split(' ')[1];
            if (token) {
                //check jwt
                const payload = await jwt.verify(token, process.env.SECRET);
                if (payload) {
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({
                        error: 'token verification failed',
                    });
                }
            } else {
                res.status(400).json({ error: 'malformed auth header' });
            }
        } else {
            res.status(400).json({ error: 'No authorization header' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});
/**** END OF SIGN IN / LOGIN ****/

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
            return res.status(400).send("User with given email doesn't exist");

        let token = await ResetPasswordTokenModel.findOne({ userId: user._id });

        if (!token) {
            token = await new ResetPasswordTokenModel({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save();
        }

        const resetTokenLink = `http://localhost:3000/users/${user._id}/${token.token}`;

        await sendPasswordResetEmail(user.email, resetTokenLink);

        res.send('Password reset link sent to your email account');
    } catch (error) {
        res.send('An error occurred');
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

const path = require('path');

router.get('/:userId/:token', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname + '/reset.html'));
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
        if (!user) return res.status(400).send('Invalid or expired link');

        console.log('2');

        const token = await ResetPasswordTokenModel.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send('Invalid or expired link');

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
