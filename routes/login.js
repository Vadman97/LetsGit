var passport = require('passport');

exports.addRoutes = function(app) {
	app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        console.log("Logging in failed");
        return res.redirect('/login');
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        console.log("Logging in successful");
        res.redirect('/dashboard');
      });
    })(req, res, next);
  });
}
