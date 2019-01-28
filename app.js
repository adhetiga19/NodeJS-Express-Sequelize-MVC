var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql'); // add library mysql
var db = require('./config/database'); // database
var bodyParser = require('body-parser');

// test connection
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// connection db MySQL
var con = mysql.createConnection({
  database: 'nodejs_test',
  user: '',
  password: '',
  host: 'localhost'
});

// routes path 
var employee = require('./routes/employee');
var job = require('./routes/job');
var home = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));

// Make our db accesible to our router
app.use(function (req, res, next) {
  req.con = con;
  next();
});

// request from jade
app.use('/', home);
app.use('/job', job);
app.use('/job/add', job);
app.use('/job/edit/:id', job);
app.use('/employee', employee);
app.use('/employee/add', employee);
app.use('/employee/edit/:id', employee);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// Port Using
app.listen(3000, 'localhost');
