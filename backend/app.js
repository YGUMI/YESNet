var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//require는 여기에 추가할 것
//================================================

var test = require('./routes/test');
var history = require('connect-history-api-fallback');
var readDApps = require('./routes/readDApps');
var signUp = require('./routes/signUp');
const login = require('./routes/login');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//session 관련
const session = require('express-session');
const session_setting = require("./routes/session_setting");
const session_getUserInfo = require("./routes/session_getUserInfo");

//레디스 관련
const redis = require('redis')
const getBalance = require('./routes/getBalance');
const createAccount = require('./routes/createAccount')
const callMethod = require('./routes/callMethod')
const getTXInfo = require('./routes/getTXInfo')
const getBlockInfo = require('./routes/getBlockInfo')
const fillEth = require('./routes/fillEth')
const requestDeploy = require('./routes/requestDeploy');

//패스포트 관련
const passport = require('passport');
const passportConfig = require('./passport.js');

//================================================

//그 외 스크립트는 여기에 추가할 것
//================================================

//몽고디비 관련
const mongoDB = 'mongodb://172.17.0.2:27017/mongodb'
const promise = mongoose.connect(mongoDB);

//레디스 관련
const redisClient = redis.createClient(6379, '172.17.0.3');

redisClient.on('error', function(err) {
  console.log('Redis error: ' + err);
});

//================================================

var app = express();

//use는 여기에 추가할 것
//================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/test', test);
app.use(history());
app.use('/api/readDApps', readDApps);
app.use('/api/signUp', signUp);

//레디스 관련
app.use(function(req, res, next) {
  req.cache = redisClient;
  next();
});

app.use('/api/getBalance', getBalance);
app.use('/api/createAccount', createAccount);
app.use('/api/callMethod', callMethod);
app.use('/api/getTXInfo', getTXInfo);
app.use('/api/getBlockInfo', getBlockInfo);
app.use('/api/fillEth', fillEth);
app.use('/api/requestDeploy', requestDeploy);

//session 관련
app.use('/api/session_setting', session_setting);
app.use('/api/session_getUserInfo', session_getUserInfo);

//패스포트 관련
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use('/api/login', login);

//================================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
