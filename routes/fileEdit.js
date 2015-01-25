var Repo = require('../models/repo.js');
var fs = require('fs');
require('./common');

exports.addRoutes = function(app) {
	app.post('/fileEdit/rename/*', ensureAuthenticated, function(req, res)
	{
		Repo.findOne({_id: req.params[0].split('/')[0]}, function(error, data)
		{
	  		if (error || data == null || !req.params[0].split('/')[0])//user doesnt have repo
	  		{
	  			console.log(error);
	  			console.log(req.params[0].split('/')[0]);
	  			console.log(data.userId);
	  			console.log(data);
	  			res.redirect("/dashboard");
	  		}

	  		console.log("Renaming!");
	  		var repoName = data.name;

			fs.rename("./repos/" + data.userId + "/" + repoName + "/" + req.params[0].split('/')[1],
			"./repos/" + data.userId + "/" + repoName + "/" + req.body["newName"], 
			function(err) {
				if (err)
					console.log(err);
			});
			//res.redirect('/');
			//console.log('/project/' + req.params[0].split('/')[0]);
			res.redirect('/project/' + req.params[0].split('/')[0]);
  		});
		
	});
	app.post('/fileEdit/delete/*', ensureAuthenticated, function(req, res)
	{
		Repo.findOne({_id: req.params[0].split('/')[0]}, function(error, data)
		{
	  		if (error || data == null || !req.params[0].split('/')[0])//user doesnt have repo
	  		{
	  			console.log(error);
	  			console.log(req.params[0].split('/')[0]);
	  			console.log(data.userId);
	  			console.log(data);
	  			res.redirect("/dashboard");
	  		}

	  		console.log("Deleting!");
	  		var repoName = data.name;

	  		fs.unlink("./repos/" + data.userId + "/" + repoName + "/" + req.params[0].split('/')[1], function(err){
	  			if (err)
					console.log(err);
	  		});
			//res.redirect('/');
			//console.log('/project/' + req.params[0].split('/')[0]);
			res.redirect('/project/' + req.params[0].split('/')[0]);
  		});
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