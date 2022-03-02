/** Environment Variables .env */
require('dotenv').config();

/** Express framework */
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());

/** Cross-origin resource sharing for tranfering data between front and backend */
app.use(cors());

const userRouter = require('./routes/UserRouter');
app.use('/users', userRouter);

/**
 * Node.js-based Object Data Modeling (ODM) library for MongoDB
 * MongoDB middleware for query drivers
 */
const mongoose = require('mongoose');

/** Connection URI to connect to MongoDB (see .env) */
mongoose.connect(process.env.ATLAS_URI);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established succesfully');
});

const port = process.env.LOCALHOST_PORT || 3000;

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
