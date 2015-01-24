
/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var express = require('express');
var passport = require('passport');

var index = require('./routes/index');
var git_pull = require('./routes/gitPull');
var project = require('./routes/project');
var file = require('./routes/file');
var login = require('./routes/login');

var app = express();

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
