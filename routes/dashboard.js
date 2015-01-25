require('./common');

exports.addRoutes = function(app) {
  app.get('/dashboard', function(req, res){
    render('dashboard', {css:["dashboard"]}, res);
  });
};
