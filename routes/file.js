require('./common');

exports.addRoutes = function(app) {
  app.get('/file', function(req, res){
    render('file', {}, res);
  });
};