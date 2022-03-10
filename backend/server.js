/** Environment variables .env */
require('dotenv').config();
const PORT = process.env.LOCALHOST_PORT || 3000;
const ROOT = 'http://localhost:3000/users';

/** MongoDB Connection Logic - Extracted to config folder - Jody */
const ConnectMongoDB = require('./config/database');
ConnectMongoDB();

/** Express framework */
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Added by Arianne when trying to implement a cookie session */
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/** Cross-origin resource sharing for tranfering data between front and backend */
const cors = require('cors');
app.use(cors());

const userRouter = require('./routes/UserRouter');
app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Connected to Port [ ${PORT} ] | Serving [ ${ROOT} ]`));
