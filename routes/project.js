require('./common');
var Repo = require('../models/repo.js');
var fs = require('fs');

exports.addRoutes = function(app) {
  app.get('/project/:id', ensureAuthenticated, function(req, res){
  	Repo.findOne({_id: req.param("id")}, function(error, data){
  		if (error || data == null)//user doesnt have repo
  			res.redirect("/dashboard");
  		var pathString = "./repos";
  		fs.readdir(pathString, function(error, files){
  			console.log("Printing project backend stuff");
  			console.log(pathString);
  			console.log(files);
			renderDashboard('project', {css:["dashboard"], project: data, files: null}, res);
  		});
    });
  });
  //todo with subfolder
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
