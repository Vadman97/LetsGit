var User = require('../models/user.js');

exports.addRoutes = function(app) {
  app.post('/signup', function(req, res, next) {
      user = User({email: req.body.email, password: req.body.password});

    User.findOne({email: req.body.email}, function(err, existingUser) {
      if (existingUser) {
        res.redirect('/signup');
      }
      user.save(function(err) {
        if (err) return next(err);
        req.logIn(user, function(err) {
          if (err) return next(err);
          res.redirect('/');
        });
      });
    });
  });
}
