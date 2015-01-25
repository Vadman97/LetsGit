var Repo = require('../models/repo.js');
require('./common');

exports.addRoutes = function(app) {
	app.post('/fileEdit/rename/*', ensureAuthenticated, function(req, res)
	{
		console.log("Renaming");
		res.redirect('/project/' + req.params[0].split('/')[0]);
	});
	app.get('/fileEdit/delete/*', ensureAuthenticated, function(req, res)
	{
		console.log("Deleting");
		res.redirect('/project/' + req.params[0].split('/')[0]);
	});
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

function ensureUnauthenticated(req, res, next) {
  if (req.isAuthenticated() == false) { return next(); }
  res.redirect('/dashboard')
}