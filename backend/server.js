/** Environment variables .env */
require('dotenv').config();
const PORT = process.env.LOCALHOST_PORT || 3000;
const ROOT = 'http://localhost:3000/users';

/** MongoDB Connection Logic */
const ConnectMongoDB = require('./config/database');
ConnectMongoDB();

/** Express framework */
const express = require('express');
const app = express();

/** Define view engine and static paths */
const path = require('path');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Added by Arianne when trying to implement a cookie session */
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/** Cross-origin resource sharing for tranfering data between front and backend */
const cors = require('cors');
app.use(cors());

app.use('/users', require('./routes/Auth.routes'));
app.use('/', require('./routes/Other.routes'));

app.listen(PORT, () => console.log(`Connected to Port [ ${PORT} ] | Serving [ ${ROOT} ]`));
