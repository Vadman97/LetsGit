require('./common');

exports.addRoutes = function(app) {
  app.get('/file', function(req, res){
    renderDashboard('file', { js: ['ace/ace', 'file'] }, res);
  });
};