const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const path = require('path');

const User = require('../models/userModel');

/* --------------------------------------------- */
// @desc    Get Home
// @route   GET /fnp/
/* --------------------------------------------- */
const home = (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './'),
    });
};

/* --------------------------------------------- */
// @desc    Register new user
// @route   POST /fnp/users
/* --------------------------------------------- */
const signUpUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists, do you have an account?');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/* --------------------------------------------- */
// @desc    Authenticate a user
// @route   POST /fnp/login
/* --------------------------------------------- */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

/* --------------------------------------------- */
// @desc    Get user data
// @route   GET /fnp/find
/* --------------------------------------------- */
const findUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    });
});

/* --------------------------------------------- */
// Generate json web token
/* --------------------------------------------- */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d',
    });
};

module.exports = {
    signUpUser,
    loginUser,
    findUser,
    home,
};
