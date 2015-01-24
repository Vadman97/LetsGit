//Home page
exports.addRoutes = function(app) {
	app.get('/', function(req, res){
		res.render('index', { body: 'This is LetsGit' });
	});
	app.get('/login', function(req, res){
                res.render('login', { body: 'This is LetsGit' });
        });
	app.get('/register', function(req, res){
                res.render('register', { body: 'This is LetsGit' });
        });
};
