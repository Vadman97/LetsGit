require('./common');

exports.addRoutes = function(app) {
  app.get('/dashboard', function(req, res){
    renderDashboard('dashboard', {css:["dashboard"]}, res);
  });
};
