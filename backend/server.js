require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const fs = require('fs');
const e = require('express');
const { json } = require('express');

const mongoose = require('mongoose');

const usersRouter = require('./routes/users')

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established succesfully");
})

app.use('/users',usersRouter)

///
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});