/** Node.js-based Object Data Modeling (ODM) library for MongoDB */
const mongoose = require('mongoose');

/** Blueprint for defining the structure of a Mongoose model that maps directly to a MongoDB collection */
const Schema = mongoose.Schema;

const sessionTokenSchema = new Schema(
    {
        session_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        session_jwt: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 180, // expires after 180 seconds = 3 mins
        },
    },
    {
        timestamps: false,
    }
);
/**
 * @param session_id - session id ref user
 * @param session_jwt - jsonwebtoken 
 * @param createdAt - date stored
 */
const SessionToken = mongoose.model('session_token', sessionTokenSchema);

module.exports = SessionToken;
