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
    },
    {
        timestamps: false,
    }
);

const SessionToken = mongoose.model('session_token', sessionTokenSchema);

module.exports = SessionToken;
