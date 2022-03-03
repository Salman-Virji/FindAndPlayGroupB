/** Node.js-based Object Data Modeling (ODM) library for MongoDB */
const mongoose = require('mongoose');

/** Blueprint for defining the structure of a Mongoose model that maps directly to a MongoDB collection */
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;