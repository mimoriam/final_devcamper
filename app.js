const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectToDB = require("./config/db");
const fileUpload = require('express-fileupload');

// Load env vars:
dotenv.config({ path: './config/config.env' })

// Connect to DB:
connectToDB().then();

// Routers:
const indexRouter = require('./routes/index');
const bootcampRouter = require('./routes/bootcamps');
const courseRouter = require('./routes/courses');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// File upload:
app.use(fileUpload());

// Define routes here:
app.use('/', indexRouter);
app.use('/api/v1/bootcamps', bootcampRouter);
app.use('/api/v1/courses', courseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
