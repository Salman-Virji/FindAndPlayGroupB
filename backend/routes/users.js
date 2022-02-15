// Split express and router into separate variables for clarity.
const express = require('express');
const router = express.Router();

// For salting passwords but we need to review this. Should be SHA-2 min. Maybe use bcrypt.
const md5 = require('md5');

// Check how to use passport for handling sessions

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    res.send('user router');
});

router.route('/signup').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password; // let not var...

    password = md5(password);
const router = require('express').Router();
//For salting passwords
//const md5 = require('md5');
let User = require('../models/User');

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

//router.use(express.urlencoded({extended:false}))

router.use(session({
    secret: "secretKey123",
    resave: false,
    saveUninitialized: false
}));

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});

passport.use(new LocalStrategy(async function (username, password, done) {
    User.findOne({username: username}, function (err, user) {
        if(err) return done(err);
        if(!user) return done(null, false, {message: 'Invalid username!'});

        bcrypt.compare(password, user.password, async function (err, res) {
            if(err) return done(err);
            if(res === false) return done(null, false, {message: 'Invalid password!'});

            //userLoggedInUsername = User.findOne({username: username})
            console.log(user);
            return done(null, user);
        })
    })
}));

router.route('/').get((req, res) => {
    res.send("user router");
});

//User signup
router.route('/signup').post(async(req, res) => {
    //Creating variables
    const SafePass = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    const email = req.body.email;
    let password = SafePass;

    const newUser = User({ username, email, password });

    const data = {
        msg: '',
        status: false,
    };

    newUser
        .save()
        .then(() => {
            data.msg = 'User added';
            data.status = true;
            res.json(data);
        })
        .catch((err) => {
            data.msg = 'Error: ' + err;
            data.status = false;
            res.send(data);
        });
});

router.route('/login').post((req, res) => {
//User login
router.route('/login').get((req, res) => {
    console.log('Failed');
});

router.route('/success').get((req,res) => {
    console.log('Success')
    const data = {
        msg: "",
        status: false
    }
    data.msg = "Valid password";
    data.status = true;
    res.send(data);
});

router.route('/login').post((req,res) => {
    console.log('login')
    const data = {
        msg: '',
        status: false,
    };

    User.find({ username: req.body.username })
        .then((user) => {
            if (req.body.user == '' || req.body.password == '') {
                data.msg = 'Please complete all fields';
                res.send(data);
                return;
            }
            if (user[0].password == md5(req.body.password)) {
                data.msg = '';
                data.status = true;
                res.send(data);
            } else {
                data.msg = 'Invalid password';
                data.status = false;
                res.send(data);
            }
        })
        .catch((err) => {
            console.log('User not found');
        });
        //If fields are empty, the user will be asked to complete them
        if (req.body.user == '' || req.body.password == '') {
            data.msg = "Please complete all fields";
            res.send(data);
            return;
        }
        //If the password entered by the user and the password stored in the database are the same, user will be logged in
        let userPassword = req.body.password;
        passwordTrial = false

        bcrypt.compare(userPassword, user.password, (req, res) =>{
            validLogin();
        })

        function validLogin() {
            data.msg = "Valid password";
            data.status = true;
            res.send(data);
        }

        if (passwordTrial) {
            console.log('Valid password')
            data.msg = "Valid password";
            data.status = true;
            res.send(data);
        } else {
            data.msg = "Invalid password";
            data.status = false;
            res.send(data);
        }
    }).catch(err => {
        console.log("User not found");
    });
});

module.exports = router;