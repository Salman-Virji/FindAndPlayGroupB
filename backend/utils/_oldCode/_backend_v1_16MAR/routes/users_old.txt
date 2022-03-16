// Split express and router into separate variables for clarity.
const express = require('express');
const router = express.Router();
const bc = require('bcrypt');
let User = require('../models/UserModel');

router.route('/').get((req, res) => {
    res.send('user router');
});

router.route('/signup').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = bc.hash(req.body.password, 10);
    
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

router.route('/login').post(async (req, res) => {
    const data = {
        msg: '',
        status: false,
    };

        User.findOne({ username })
        .then((user) => {
            if (req.body.username == '' || req.body.password == '') {
                data.msg = 'Please complete all fields';
                res.send(data);
                return;
            }
            if (user.password == (await bc.compare(password, user.password))) {
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
});

module.exports = router;
