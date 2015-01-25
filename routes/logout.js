var passport = require('passport');

exports.addRoutes = function(app) {
	app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}
