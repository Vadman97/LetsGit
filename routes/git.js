exports.addRoutes = function(app) {
	app.get('/app', function(req, res){
		res.render('index', { body: 'This is LetsGit' });
	});
};