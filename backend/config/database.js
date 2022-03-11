require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const ConnectMongoDB = () => {
    try {
        //Create the database connection
        mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;

        connection.on('connected', function () {
            console.log(`Connected to MongoDB [ ${mongoose.connection.name} ] | Connected to SessionStore [ expresssession ]`);
        });

        connection.on('error', function (err) {
            console.log('Mongoose connection error: ' + err);
        });

    } catch (error) {
        console.log(error.message);
    }
};

const SessionStore = session({
    store: new MongoStore({
        mongoUrl: process.env.ATLAS_URI,
        collection: 'expresssession',
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 2 },
})

module.exports = { ConnectMongoDB, SessionStore };
