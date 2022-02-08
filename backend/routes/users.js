// Split express and router into seperate variables for clarity.
const express = require('express');
const router = express.Router();

// For salting passwords but we need to review this. Should be SHA-2 min.
const md5 = require('md5');

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    res.send('user router');
});

router.route('/signup').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password; // let not var...

    password = md5(password);

    const newUser = User({ username, email, password });

    const data = {
        msg: '',
        status: false,
    };

    newUser
        .save()
        .then(() => {
            data.msg = 'User Added!';
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
    const data = {
        msg: '',
        status: false,
    };

    User.find({ username: req.body.username })
        .then((user) => {
            if (req.body.user == '' || req.body.password == '') {
                data.msg = 'Please Complete All Fields';
                res.send(data);
                return;
            }
            if (user[0].password == md5(req.body.password)) {
                data.msg = '';
                data.status = true;
                res.send(data);
            } else {
                data.msg = 'Wrong Password';
                data.status = false;
                res.send(data);
            }
        })
        .catch((err) => {
            console.log('No user found');
        });
});

module.exports = router;
