const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionTokenSchema = new Schema(
    {
        userId: {
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
            expires: 20000,
        },
    },
    {
        timestamps: true,
    }
);

const SessionToken = mongoose.model('SessionToken', sessionTokenSchema);

module.exports = SessionToken;