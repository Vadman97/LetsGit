require('./common');
var Repo = require('../models/repo.js');
var fs = require('fs');

exports.addRoutes = function(app) {
  app.get('/project/:id', ensureAuthenticated, function(req, res){
  	Repo.findOne({_id: req.param("id")}, function(error, data){
  		if (error || data == null)//user doesnt have repo
  			res.redirect("/dashboard");
  		var pathString = data.path;
  		fs.readdir(pathString, function(error, files)
  		{
  			//for now, project figures out if directory or file when requesting
  			/*
  			var links = [];
  			for (i in files)
  			{
  				//pass to ejs file names, links (different if file or folder
  				//no slash at the end of the pathString actually
  				//make the ejs display folders vs files differently
  				if (fs.statSync(pathString + files[i]).isDirectory())
  				{
  					links[i] = "/project/" + req.param("id") + "/" + files[i];
  				}
  				else
  				{
  					links[i] = "/project/" + req.param("id") + "/" + files[i];
  				}
  			}*/
  			console.log("Printing project backend stuff");
  			console.log(pathString);
  			console.log(files);
			renderDashboard('project', {css:["dashboard"], project: data, files: files, currentPath: "/project/" + req.param("id")}, res);
  		});
    });
  });
  //todo with subfolder
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
