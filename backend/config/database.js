require('dotenv').config();
const mongoose = require('mongoose');

const ConnectMongoDB = async () => {
    try {
        const db = await mongoose.connect(process.env.ATLAS_URI);
        console.log(`Connected to MongoDB [ ${db.connection.name} ]`);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = ConnectMongoDB;
