
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
var bodyParser = require('body-parser');
var User = require('./models/user');
var session = require('express-session');

var creds = require('./routes/creds');

var index = require('./routes/index');
var git_pull = require('./routes/gitPull');
var project = require('./routes/project');
var login = require('./routes/login');
var signup = require('./routes/signup');
var dashboard = require('./routes/dashboard');
var git = require('./routes/git');
var logout = require('./routes/logout');
var test = require('./routes/test');

var app = express();
var s3 = new AWS.S3();

mongoose.connect('mongodb://letsg.it:8001/LetsGit');
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
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({secret: creds.session_secret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  if (req.method == 'POST' && req.url == '/login' ) {
    if ( req.body.rememberme ) {
      req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
    } else {
      req.session.cookie.expires = false;
    }
  }
  next();
});
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
login.addRoutes(app);
signup.addRoutes(app);
dashboard.addRoutes(app);
git.addRoutes(app);
logout.addRoutes(app);
test.addRoutes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
