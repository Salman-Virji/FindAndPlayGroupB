//Node.js-based Object Data Modeling (ODM) library for MongoDB
const mongoose = require("mongoose");
//Blueprint for defining the structure of a Mongoose model that maps directly to a MongoDB collection
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
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
});

module.exports = mongoose.model("Token", tokenSchema);