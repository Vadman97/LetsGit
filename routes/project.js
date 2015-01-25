require('./common');
var Repo = require('../models/repo.js');
var fs = require('fs');
var strftime = require('strftime');

exports.addRoutes = function(app) {
  app.get('/project/:id', ensureAuthenticated, function(req, res){
  	Repo.findOne({_id: req.param("id")}, function(error, data){
  		if (error || data == null || !req.param("id"))//user doesnt have repo
  			res.redirect("/dashboard");
  		var pathString = data.path;
      var repoName = data.name;
  		fs.readdir(pathString, function(error, files)
  		{
  			//for now, project figures out if directory or file when requesting
  			for (i in files)
  			{
  				//pass to ejs file names
  				//no slash at the end of the pathString actually
          //console.log(i);
          //console.log(files[i]);
          //console.log(files[i]);
          //console.log(files[i].indexOf('.'));
          if (files[i].indexOf('.') == 0)
          {
            //console.log(i);
            files.splice(i, 1);
          }

          var stats = fs.statSync(pathString + files[i]);
  				if (stats.isDirectory())
  				{
  					files[i] = files[i] + '/'; // make the ejs display folders vs files differently
  				}
          files[i].stats = stats;
          files[i].lm = strftime('%b %e, %Y at %l:%M', stats.mtime);
  			}
  			//console.log("Printing project backend stuff");
  			//console.log(pathString);
  			//console.log(files);
  			renderDashboard('project', {css:["dashboard"], js:["project", "projectButtons"], project: data, ownerID: req.user._id, files: files, currentPath: "/project/" + req.param("id") + '/', repoName: repoName, parent: false}, res);
  		});
    });
  });

  app.post('/project/:id/*/save', ensureAuthenticated, function(req, res) {
    Repo.findOne({_id: req.param('id')}, function(error, data){
      fs.writeFile(data.path + req.params[0], req.body.text, function(err) {
        if(err) throw err;
        res.json({code: 0});
      });
    });
  });
  
  app.get('/project/:id/*', ensureAuthenticated, function(req, res){
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
              var stats = fs.statSync(pathString + files[i]);
              if (stats.isDirectory() && files[i].charAt(files[i].length-1) != '/') {
                files[i] = files[i] + '/'; // make the ejs display folders vs files differently
              }
              files[i].stats = stats;
            }
            renderDashboard('project', {css:["dashboard"],  js:["project", "projectButtons"], project: data, ownerID: req.user._id, files: files, currentPath: "/project/" + req.param("id") + '/' + req.params[0], parent: true}, res);
          });
        } else {
          fs.readFile(pathString, function(err, text){
            if (err) throw err;
            renderDashboard('file', { js: ['ace/ace', 'ace/ext-modelist', 'file', 'project', 'projectButtons'], data:text, project: data, currentPath: "/project/" + req.param("id") + '/' + req.params[0]}, res);
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
