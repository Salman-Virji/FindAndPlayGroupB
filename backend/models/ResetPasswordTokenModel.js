const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resetTokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 3600,
        },
    },
    {
        timestamps: true,
    }
);

const ResetPasswordToken = mongoose.model('ResetPasswordToken', resetTokenSchema);

module.exports = ResetPasswordToken;