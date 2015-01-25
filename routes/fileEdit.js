var Repo = require('../models/repo.js');
var fs = require('fs');
require('./common');

exports.addRoutes = function(app) {
	app.post('/fileEdit/rename/*', ensureAuthenticated, function(req, res)
	{
		console.log("Renaming: " + req.params[0]);
		console.log("./repos/" + req.params[0]);
		console.log("./repos/" + req.params[0].split('/')[0] + "/" + req.body["newName"]);


		fs.stat("./repos/" + req.params[0], function(err, stat){
			console.log("Stat!");
			if (err)
				console.log(err);
			console.log(stat);

			fs.rename("./repos/" + req.params[0], "./repos/" + req.params[0].split('/')[0] + "/" + req.body["newName"], function(err) {
				if (err)
					console.log(err);
			});
		});

		fs.readdir(".", function(err, files) {
			if (err)
				console.log(err);
			console.log(files);
		})
		res.redirect('/');
		//console.log('/project/' + req.params[0].split('/')[0]);
		//res.redirect('/project/' + req.params[0].split('/')[0]);
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