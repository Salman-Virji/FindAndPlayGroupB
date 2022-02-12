const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

const express = require('express');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/fnp', require('./routes/userRoutes'));

app.use(errorHandler)

app.listen(PORT, () => console.log(`Backend Server started on port ${PORT}`));
