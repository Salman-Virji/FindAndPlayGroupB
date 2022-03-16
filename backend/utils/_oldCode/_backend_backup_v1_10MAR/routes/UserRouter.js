/** Middleware to create modular, mountable route handlers */
const router = require('express').Router();

/** Node.js module that performs data encryption and decryption */
const crypto = require('crypto');

/** Joi module validates the data based on schemas (building schemas to validate JavaScript objects) */
const Joi = require('joi');

/** For salting passwords */
const bcrypt = require('bcrypt');

/** Reset password middleware, edited name to be more discriptive. */
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');

// const mongoose = require('mongoose')
// const MongoStore = require("connect-mongo");

/** These are the database models we are using to make instances in this router */
const UserModel = require('../models/UserModel');
const ResetPasswordTokenModel = require('../models/ResetPasswordTokenModel');

/** Added by Arianne when trying to implement a cookie session */
const jwt = require('jsonwebtoken');

// var cookieParser = require("cookie-parser");
// var session = require("express-session");

// const url = 'mongodb+srv://test:test@realmcluster.mvyvj.mongodb.net/testDB?retryWrites=true&w=majority';

//     let store = new MongoStore({
//         mongoUrl: url,
//         collectionName:"sessiontokens"
//     })

// router.use(cookieParser());

// router.use(
//     session({
//         key: "user_sid",
//         secret: "SecretFind",
//         resave: true,
//         store: store,
//         saveUninitialized:true,
//         cookie: {
//           expires: 7200,
//         },
//       })
// )

// router.use(function(req,res,next){
//     console.log(req.session);
//     console.log("+++++++++++++");
//     console.log(req.user);
//     next();
// })

// router.use((req,res,next)=>{
//     if(req.cookies.user_sid && !req.session.username){
// res.clearCookie("user_sid");
//     }
//     next();
// })

// var sessionChecker = (req,res,next)=>{
//     if(req.session.username && req.cookies.user_sid){
//    res.redirect('/Homepage')
//     }
//     next();
// }

// router.route('/Homepage').get((req, res)=>{
//     if(req.session.username && req.cookies.user_sid){
//         res.send("HomePageReached")
//     }
//     else{
//         res.send("You need to login first");
//     }
// })

/** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/** @ Thomas / Agyapal */
// const SessionTokenModel = require('../models/SessionTokenModel');

// // const store = new MongoDBStore({
// //     uri: " mongodb+srv://test:test@realmcluster.mvyvj.mongodb.net/testDB?retryWrites=true&w=majority",
// //     collection:"sessiontokens"
// // });

// // router.use(
// //     session({
// //         secret:"secret",
// //         resave:false,
// //         saveUninitialized:false,
// //         store:store
// //     })
// // );

// router.route('/session/:id').get((req, res) => {
//     // post new token after login...
//     const error = req.session.error;
//     delete req.session.error;
//     res.render("login", { err: error });
// });

// router.route('/session/:id').post(async (req, res) => {
//     // get or check if valid session token...
//     const { email, password } = req.body;

//     const user = await user.findOne({ email });

//     if (!user) {
//         req.session.error = "Invalid Credentials";
//         return res.redirect("/login");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//         req.session.error = "Invalid Credentials";
//         return res.redirect("/login");
//     }

//     req.session.isAuth = true;
//     req.session.username = user.username;
//     res.redirect("/LandingScreen");
// });

/** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/** @ Jody / Arianne */
// router.route('/logout').post((req, res) => {
//     // Delete session token if it exists
//     if(req.session.username && req.cookies.user_sid){
//         res.clearCookie("user_sid");
//         res.redirect("/");

//     }
//     else{
//         res.redirect('/login')
//     }
// });

/** Added by Arianne when trying to implement a cookie session */
// router.route('/logout').post((req, res) => {
//     res.clearCookie('nToken');
//     res.redirect("/");
//     //return res.redirect('/');
// });

/******************************
 **** BASE ROUTE *****
 ******************************/
router.route('/').get((req, res) => {
    res.send('🙂 UserModel Route Connected 🙂');
});

/******************************
 ***** USER SIGN UP ROUTE *****
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

    /** NOTE: We need to use middleware to check the input entry for sanitation and duplicate entry username/email...
     * So that would mean is the username at least 6 chars or password is strong and email is valid email etc. This is simple to work in here.
     */

    newUser
        .save()
        .then(() => {
            /** Added by Arianne when trying to implement a cookie session */
            //const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '2 hours'});
            //res.cookie('nToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

            data.msg = `New user ${newUser.username} added`;
            data.status = true;
            res.json(data);
            /** Added by Arianne when trying to implement a cookie session */
            //res.redirect('/');
            //return res.redirect('/');
        })
        .catch((err) => {
            data.msg = 'Error: ' + err;
            data.status = false;
            res.send(data);
        });
});
/***** END OF USER SIGN UP ROUTE *****/

/*******************************************
 ***** USER LOGIN / USER SIGN IN ROUTE *****
 *******************************************/
router.route('/login').post(async (req, res) => {
    const username = req.body.username.toLowerCase();
    const rawPassword = req.body.password;

    const data = {
        msg: '',
        status: false,
        //msgs: req.session
    };

    // Finding an user by username
    UserModel.findOne({ username: username })
        .then(async (result) => {
            // If 'Either' of the fields are empty, the user will be asked to complete them
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
                /** Added by Arianne when trying to implement a cookie session */
                // // Create a token
                // const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                //     expiresIn: '2 hours'
                // });
                // // Set a cookie and redirect to root
                // res.cookie('nToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

                // SET SESSION TOKEN IN DB  middleware function to set session cookie.
                data.msg = `${username} AUTHENTICATED - SET SESSION TOKEN AND SEND USER TO MAIN AREA OF APP`;
                data.status = true;
                res.send(data);
                /** Added by Arianne when trying to implement a cookie session */
                //res.redirect('/');
                //return res.redirect('/');
            } else {
                data.msg = 'Invalid username or password. Please try again.';
                data.status = false;
                res.send(data);
            }
        })
        .catch((err) => {
            data.msg = `User not found, ${err.message}`;
            data.status = false;
            res.send(data);
        });
});
/***** END OF USER LOGIN / USER SIGN IN ROUTE *****/

/*
 ***** RESET PASSWORD TOKEN ROUTE ******
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
/***** END OF RESET PASSWORD TOKEN ROUTE *****/

const path = require('path');
const { appendFile } = require('fs');
const { Mongoose } = require('mongoose');
const { nextTick } = require('process');

router.get('/:userId/:token', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname + '/reset.html'));
    } catch (error) {
        res.send('An error occurred');
        console.log(error);
    }
});

router.post('/:userId/:token', async (req, res) => {
    //console.log(req.body) urlencoded... !
    try {
        const schema = Joi.object({ password: Joi.string().required() });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

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
});

module.exports = router;