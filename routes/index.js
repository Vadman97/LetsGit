require('./common');

//Home page
exports.addRoutes = function(app) {
	app.get('/', function(req, res){
		renderHome('index', {css:['landing'], page:1}, res);
	});
	app.get('/login', function(req, res){
    renderHome('login', {css:['login'], page:2}, res);
  });
	app.get('/register', function(req, res){
		renderHome('register', {css:['login'], page:3}, res);
  });
};
