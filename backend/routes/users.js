//We need to implement passport to handle sessions
//We need to implement forgot password

const router = require('express').Router();
//For salting passwords. Maybe we could use bcrypt (more secure).
const md5 = require('md5');
let User = require('../models/user.model');


router.route('/').get((req,res) => {
    res.send("user router");
});

//User signup
router.route('/signup').post((req,res) => {
    //Creating variables
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    password = md5(password);

    const newUser= User({username,email,password});

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

    //Finding a user by username
    User.find({username:req.body.username}).then(user => {

        //If fields are empty, the user will be asked to complete them
        if (req.body.user == '' || req.body.password == '') {
            data.msg = "Please complete all fields";
            res.send(data);
            return;
        }
        //If the password entered by the user and the password stored in the database are the same, user will be logged in
        if (user[0].password == md5(req.body.password)) {
            data.msg = "";
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