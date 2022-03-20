/** Environment variables .env */
require('dotenv').config();
const PORT = process.env.LOCALHOST_PORT || 3000;
const ROOT = `http://localhost:${PORT}/auth`;

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

/** Cross-origin resource sharing for tranfering data between front and backend */
const cors = require('cors');
app.use(cors());

/** MongoDB and store connection logic */
const { ConnectMongoDB, SessionStore } = require('./config/database');
ConnectMongoDB();
app.use(SessionStore);

/** Routing */
app.use('/auth', require('./routes/Auth.routes'));

app.listen(PORT, () =>
    console.log(`Connected to Port [ ${PORT} ] | Serving [ ${ROOT} ]`)
);
