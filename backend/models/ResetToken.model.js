/** Node.js-based Object Data Modeling (ODM) library for MongoDB */
const mongoose = require('mongoose');

/** Blueprint for defining the structure of a Mongoose model that maps directly to a MongoDB collection */
const Schema = mongoose.Schema;

const resetTokenSchema = new Schema(
    {
        reset_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        reset_token: {
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

const ResetToken = mongoose.model('reset_token', resetTokenSchema);

module.exports = ResetToken;