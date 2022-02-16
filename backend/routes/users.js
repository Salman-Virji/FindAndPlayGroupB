//Middleware to create modular, mountable route handlers
const router = require('express').Router();
//Node.js module for password hashing
const md5 = require('md5');
//Node.js module that performs data encryption and decryption
const crypto = require("crypto");
//Joi module validates the data based on schemas (we build schemas to validate JavaScript objects)
const joi = require("joi");

//const jwt = require('jsonwebtoken');
//const JWT_SECRET = 'sdfnsdljgnsdgn';
//const nodemailer = require('nodemailer');

const User = require('../models/User');
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");

router.route('/').get((req, res) => {
    res.send("User router");
});

//User signup
router.route('/signup').post((req, res) => {
    //Creating variables
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    password = md5(password);

    const newUser= User({username, email, password});

    const data = {
        msg: "",
        status: false
    };

    //If successfull, user will be added, otherwise it will display an error
    newUser.save()
        .then(() => {
            data.msg = "User added";
            data.status = true;
            res.json(data);
        })
        .catch(err => {
            data.msg = "Error: " + err;
            data.status = false;
            res.send(data);
        });
});

//User login
router.route('/login').post((req,res) => {

    const data = {
        msg: "",
        status: false
    }

    //Finding an user by username
    User.findOne({ username: req.body.username }).then(user => {

        //If fields are empty, the user will be asked to complete them
        if (req.body.user == '' || req.body.password == '') {
            data.msg = "Please complete all fields";
            res.send(data);
            return;
        }
        //If the password entered by the user and the password 
        //stored in the database are the same, user will be logged in
        if (user.password == md5(req.body.password)) {
            data.msg = "Valid password";
            data.status = true;
            res.send(data);
        } else {
            data.msg = "Invalid password";
            data.status = false;
            res.send(data);
        }
    }).catch(err => {
        data.msg = "User not found";
        data.status = false;
        res.send(data);
        console.log("User not found");
    });
});

//Forget password
router.post("/forgot-password", async (req, res) => {

    try {
        const schema = joi.object({ email: joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("User with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();
        }

        const link = `localhost:3000/users/${user._id}/${token.token}`;
        console.log(link);
        await sendEmail(user.email, "Password reset", link);

        res.send("Password reset link sent to your email account");
    } catch (error) {
        res.send("An error occurred");
        console.log(error);
    }
});

//Reset password
router.post("/:userId/:token", async (req, res) => {
    try {
        const schema = joi.object({ password: joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("Invalid or expired link");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send("Invalid or expired link");

        user.password = md5(req.body.password);
        await user.save();
        await token.delete();

        res.send("Password reset sucessfully");
    } catch (error) {
        res.send("An error occurred");
        console.log(error);
    }
});

module.exports = router;