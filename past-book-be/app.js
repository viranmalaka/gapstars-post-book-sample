const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/past-book', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);

module.exports = app;
