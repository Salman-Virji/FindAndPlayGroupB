// const e = require('express'); Not needed!

require('dotenv').config();

// ExpressJs framework
const express = require('express');
const app = express();

// Cross-origin resource sharing CORS
const cors = require('cors');

// Secrets in .env and added to gitignore
const port = process.env.LOCALHOST_PORT;
const uri = process.env.ATLAS_URI;

// MongoDB middleware for query drivers
const mongoose = require('mongoose');

const usersRouter = require('./routes/users')

app.use(express.json());
app.use(cors());

mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established succesfully");
})

app.use('/users',usersRouter)

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});