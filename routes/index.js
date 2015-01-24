//Home page
exports.addRoutes = function(app) {
	app.get('/', function(req, res){
		res.render('index', { body: 'This is LetsGit' });
	});
};