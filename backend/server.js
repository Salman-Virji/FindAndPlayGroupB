/** Environment variables .env */
require('dotenv').config();
const port = process.env.LOCALHOST_PORT || 3000;

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

/** MongoDB Connection Logic - Extracted to config folder - Jody */
require('./config/database');
Connect_To_MongoDB();

app.listen(port, () => console.log('Server listening on port ' + port));
