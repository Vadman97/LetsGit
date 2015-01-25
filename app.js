
/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var express = require('express');
var passport = require('passport');
var AWS = require('aws-sdk'); 
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var index = require('./routes/index');
var git_pull = require('./routes/gitPull');
var project = require('./routes/project');
var file = require('./routes/file');
var login = require('./routes/login');
var signup = require('./routes/signup');

var app = express();
var s3 = new AWS.S3();

mongoose.connect('localhost', 'LetsGit');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (!user) return done(null, false, { message: 'Email ' + email + ' not found'});
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid email or password.' });
      }
    });
  });
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

index.addRoutes(app);
git_pull.addRoutes(app);
project.addRoutes(app);
file.addRoutes(app);
login.addRoutes(app);
signup.addRoutes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
