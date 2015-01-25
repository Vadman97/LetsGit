require('./common');
var Repo = require('../models/repo.js');

exports.addRoutes = function(app) {
  app.get('/project/:id', ensureAuthenticated, function(req, res){
  	Repo.findOne({_id: req.param("id")}, function(error, data){
  		if (error)
  			res.redirect("/dashboard");
  		console.log(data);
		renderDashboard('project', {css:["dashboard"], project: data}, res);
    });
  });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
