var passport = require('passport');

exports.addRoutes = function(app) {
	app.post('/login', ensureUnauthenticated, function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        console.log("Logging in failed");
        return renderHome('login', {page: 2, css: ['login'], error: 'Invalid username or password.'}, res);
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        console.log("Logging in successful");
        res.redirect('/dashboard');
      });
    })(req, res, next);
  });
}

function ensureUnauthenticated(req, res, next) {
  if (req.isAuthenticated() == false) { return next(); }
  res.redirect('/dashboard')
}
