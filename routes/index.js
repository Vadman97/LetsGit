require('./common');

//Home page
exports.addRoutes = function(app) {
	app.get('/', ensureUnauthenticated, function(req, res){
		renderHome('index', {css:['landing'], page:1, js:['landing']}, res);
		console.log(req.user);
	});
	app.get('/login', function(req, res){
    renderHome('login', {css:['login'], page:2, js:['login']}, res);
  });
	app.get('/register', function(req, res){
		renderHome('register', {css:['login', 'register'], js:['register'], page:3}, res);
  });
};

function ensureUnauthenticated(req, res, next) {
  if (req.isAuthenticated() == false) { return next(); }
  res.redirect('/dashboard')
}
