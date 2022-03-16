/** Node.js-based Object Data Modeling (ODM) library for MongoDB */
const { boolean } = require('joi');
const mongoose = require('mongoose');

/** Blueprint for defining the structure of a Mongoose model that maps directly to a MongoDB collection */
const Schema = mongoose.Schema;

const sessionTokenSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60000 * 3,
        },
    }
);

const SessionToken = mongoose.model('SessionToken', sessionTokenSchema);

module.exports = SessionToken;