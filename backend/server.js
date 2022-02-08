/*
On terminal inside backend folder:
npm init -y
npm install express mongoose cors dotenv md5
Can also install nodemon:
npm install nodemon
*/

// const e = require('express'); Not needed!

require('dotenv').config();

// ExpressJs framework
const express = require('express');
// MongoDB middleware for query drivers
const mongoose = require('mongoose');
// Cross-origin resource sharing CORS for tranfering data between front and backend
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users',usersRouter);

// Secrets in .env and added to gitignore
const port = process.env.LOCALHOST_PORT;
const uri = process.env.ATLAS_URI;

// Connection to the database
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established succesfully");
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Check with the frontend what port they are using
// http://localhost:3000
// Define a server that listens to port 3000
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

// Another way to connect to the database
// const mongoUri = 'mongodb+srv://groupb2_admin:Q4zbzQrIkjhaYPQf@realmcluster.mvyvj.mongodb.net/test';
// mongoose.connect(mongoUri);

// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB instance');
// });

// mongoose.connection.on('error', (err) => {
//     console.error('Error connecting to MongoDB', err);
// });