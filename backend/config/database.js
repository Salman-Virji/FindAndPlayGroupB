require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const ConnectMongoDB = () => {
    try {
        mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;

        connection.on('connected', function () {
            console.log(
                `Connected to MongoDB [ ${mongoose.connection.name} ] | Connected to SessionStore [ expresssession ]`
            );
        });

        connection.on('error', function (err) {
            console.log('Mongoose connection error: ' + err);
        });
    } catch (error) {
        console.log(error.message);
    }
};

/**
 * @ttl Time to live in seconds
 * @maxAge cookie ttl in milliseconds
 */
const SessionStore = session({
    store: new MongoStore({
        mongoUrl: process.env.ATLAS_URI,
        collectionName: process.env.ATLAS_COLLECTION,
        autoRemove: 'interval',
        autoRemoveInterval: 10, // In Minutes: Removes session after 60 mins
        ttl: 180, // In Seconds: Time to live 180 seconds = 3 mins
        touchAfter: 1 // In Seconds: Interval between session updates.
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
});

module.exports = { ConnectMongoDB, SessionStore };
