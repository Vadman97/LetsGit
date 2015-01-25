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
  			for (i in files)
  			{
  				//pass to ejs file names
  				//no slash at the end of the pathString actually
          console.log(i);
          console.log(files[i]);
  				if (fs.statSync(pathString + files[i]).isDirectory())
  				{
  					files[i] = files[i] + '/'; // make the ejs display folders vs files differently
  				}
  			}
  			console.log("Printing project backend stuff");
  			console.log(pathString);
  			console.log(files);
			renderDashboard('project', {css:["dashboard"], js:["project", "projectButtons"], project: data, ownerID: req.param("id"), files: files, currentPath: "/project/" + req.param("id"), parent: false}, res);
  		});
    });
  });
  
  app.get('/project/:id/*', ensureAuthenticated, function(req, res){
    //res.send(req.params[0]);
    Repo.findOne({_id: req.param("id")}, function(error, data){
      if (error || data == null)//user doesnt have repo
        res.redirect("/dashboard");
      var pathString = data.path + req.params[0]; // todo ensure this doesn't access weird places, actually no slash at end
      fs.stat(pathString, function(err, stats) {
        if(stats.isDirectory()) {
          fs.readdir(pathString, function(error, files) {
            //for now, project figures out if directory or file when requesting
            for (i in files) {
              //pass to ejs file names
              //no slash at the end of the pathString actually
              if (fs.statSync(pathString + files[i]).isDirectory()) {
                files[i] = files[i] + '/'; // make the ejs display folders vs files differently
              }
            }
            renderDashboard('project', {css:["dashboard"],  js:["project, projectButtons"], project: data, ownerID: req.param("id"), files: files, currentPath: "/project/" + req.param("id") + '/' + req.params[0], parent: true}, res);
          });
        } else {
          fs.readFile(pathString, function(err, text){
            if (err) throw err;
            renderDashboard('file', { js: ['ace/ace', 'ace/ext-modelist', 'file', 'project', 'projectButtons'], data:text, project: data}, res);
          });
        }
      });
    });
  });

};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
