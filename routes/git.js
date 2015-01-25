var clone = require('nodegit').Clone.clone;

exports.addRoutes = function(app) {
        app.get('/app', function(req, res) {
                res.render('index', { body: 'This is LetsGit' });
        });

        app.post('/clone', function(req, res) {
                var repoURL = req.body.repourl;
                // clone(repoURL, "repos/" + req.user);
                // console.log(req.user);
                console.log(repoURL);
                res.json({repo: repoURL});
        });

        app.post('/createrepo', function(req, res) {

        });
};