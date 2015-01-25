var Repo = require('../models/repo.js');
require('./common');

exports.addRoutes = function(app) {
	app.get('/repoDel/:repoid', ensureAuthenticated, function(req, res)
	{
		Repo.find({_id: req.param("repoid")}, function(error, data){
	    	if (error)
	    		throw error;
	    }).remove().exec();
	    res.status(200).end();
	    // res.redirect('/');
	});
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
