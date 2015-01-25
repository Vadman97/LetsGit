require('./common');

exports.addRoutes = function(app) {
  app.get('/project/:id', function(req, res){
    renderDashboard('project', { css: ['project'] }, res);
  });
};