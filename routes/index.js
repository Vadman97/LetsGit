require('./common');

//Home page
exports.addRoutes = function(app) {
	app.get('/', function(req, res){
		renderHome('index', {css:['landing'], page:1}, res);
		console.log(req.user);
	});
	app.get('/login', function(req, res){
        renderHome('login', {css:['login'], page:2}, res);
    });
	app.get('/register', function(req, res){
		renderHome('register', {css:['register'], page:3}, res);
    });
};
