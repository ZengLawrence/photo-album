var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// scan folders
var album = require('./album');
setTimeout(() => {
  album
    .scanAlbumFolders( (err, data) => {
      console.log('Done scanning folders');
    })
  }, 1000);

var indexRouter = require('./routes/index');
var albumRouter = require('./routes/album');
var thumbnailsRouter = require('./routes/thumbnails');
var yearsRouter = require('./routes/years');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/albums', albumRouter);
app.use('/thumbnails', thumbnailsRouter);
app.use('/years', yearsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
