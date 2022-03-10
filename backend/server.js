/** Environment variables .env */
require('dotenv').config();
require('../backend/config/database');

/** Express framework */
const express = require('express');
const app = express();
const cors = require('cors');

/** Added by Arianne when trying to implement a cookie session */
const cookieParser = require('cookie-parser');

Connect_To_MongoDB();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Added by Arianne when trying to implement a cookie session */
app.use(cookieParser());

/** Cross-origin resource sharing for tranfering data between front and backend */
app.use(cors());

const userRouter = require('./routes/UserRouter');
app.use('/users', userRouter);

const port = process.env.LOCALHOST_PORT || 3000;

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
