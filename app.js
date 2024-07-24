var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session')
var flash = require('express-flash-notification')
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
var fileUpload = require('express-fileupload')
// var logger = require('morgan');

const Mongodb = require('./src/apps/mongodb.init')
const apiItemRouter = require('./src/routes/api/v1/api_item_router');

Mongodb.connection();
var app = express();
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash());

__uploadImg = __dirname + '/public/image/'


// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'admin')


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(fileUpload({
//   useTempFiles : true,
//   tempFileDir : path.join(__dirname, '/public/image')
// }));

app.use('/', require('./src/routes'));
app.use('/api/v1', apiItemRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err , req, res, next) {
  if(err instanceof mongoose.Error.ValidationError){
    const e = {}
    for(let key in err.errors){
      e[key] = err.errors[key].message
    }
    return res.status(400).json(e)
  }
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message : err.message
  })
});

module.exports = app;
