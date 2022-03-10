require('dotenv').config();
const mongoose = require('mongoose');

const Connect_To_MongoDB = async () => {
    try {
        const db = await mongoose.connect(process.env.ATLAS_URI);
        console.log(`MongoDB Connected: ${db.connection.host}`);
    } catch (error) {
        console.log(`Error connecting due to: ${error}`);
    }
};

module.exports = Connect_To_MongoDB;
