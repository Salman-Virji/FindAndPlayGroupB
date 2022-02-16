//We need to implement forgot password

const router = require('express').Router();
//For salting passwords. Maybe we could use bcrypt.
const md5 = require('md5');
let User = require('../models/User');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdfnsdl;jgn;sdgn;'
const nodemailer = require('nodemailer')


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

    //Finding an user by username
    User.findOne({username:req.body.username}).then(user => {

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
        console.log("User not found");
    });
});

//////////////////////////////////////
let user = {
    id:"aaaaa",
    email:"a.dhanoa000@gmail.com",
    password:"abc"
}

router.route('/forget-password').post((req,res) => {
  
 

    let gemail =this.toString(req.body)
    if(gemail!== user.email){
        res.send('User not found')
        console.log(typeof(gemail))
        console.log(typeof(user.email))
        // return;
    }
 
    const secret = JWT_SECRET + user.password;
const payload = {
    email:user.email,
    id:user.id
}

const token = jwt.sign(payload,secret, {expiresIn:'15m'} )
  const link = `localhost:3000/reset-password/${user.id}/${token}`
  
let transporter=  nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'findandplay78@gmail.com',
        pass:'FindAndPlay'
    }

})

let user_email = 'agyapaldhanoa@gmail.com'

let mailOptions ={
    from:'findandplay78@gmail.com',
    to:`${user_email}`,
    subject:'Testing and Testing',
    text:`IT works  \n\n              ${link}                   \n\n Click here`,
    html:`<h1>Link For Resetting your password</h1> <br>
    <p>An request is sent to reset password, If not please ignore,
    </p><br>
    <p>Please click on the link below</p><br>
    <p>Please Reset Link</p><br>
    <a href= "">   ${link}  </a>`
}


transporter.sendMail(mailOptions,function(err,data){
    if(err){
        console.log('Error occurs');

    }
    console.log('Email sent')
})
})


router.route('/reset-password/:id/:token').get((req,res) => {
  
const {id,token } =req.params;
if(id!==user.id){
    res.send("invalid id")
    return
}


const secret = JWT_SECRET+ user.password;
try{
const payload = jwt.verify(token,secret);
res.render('reset-password',
 {email:user.email});

}
catch(error){
    console.log(error.message);
    res.send(error.message); 
}
});

router.route('/reset-password/:id/:token').post((req,res) => {
    const {id,token } =req.params;
    const {password, password2} = req.body;

    if(id!==user.id){
        res.send('Invalid id...');
        return;
    }


  const secret = JWT_SECRET + user.password
    try{
        const payload = jwt.verify(token,secret)
        user.password =password;
        res.send(user)

    }catch(error){
        console.log(error.message)
        res.send(error.message)
    }
    res.send(user);
});


module.exports = router;