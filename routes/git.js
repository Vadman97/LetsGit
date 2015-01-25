var clone = require('nodegit').Clone.clone;
var validator = require('validator');

exports.addRoutes = function(app) {
        app.get('/app', function(req, res) {
                res.render('index', { body: 'This is LetsGit' });
        });

        app.post('/clone', function(req, res) {
                var repoURL = req.body.url;
                // clone(repoURL, "repos/" + req.user);
                if (validator.isURL(repoURL)) {
                	clone(repoURL, "../repos").then(function(repo) {
					  // Use a known commit sha from this repository.
					  var sha = "5e6594d83545d4d95835b9ef8ea9591001266312";

					  // Look up this known commit.
					  repo.getCommit(sha).then(function(commit) {
					  	console.log("enter1");
					    // Look up a specific file cwithin that commit.
					    commit.getEntry("README.md").then(function(entry) {
					    	console.log("enter2");
					      // Get the blob contents from the file.
					      entry.getBlob().then(function(blob) {
					      	console.log("enter3");
					        // Show the name, sha, and filesize in byes.
					        console.log(entry.filename(), entry.sha(), blob.rawsize());

					        // Show a spacer.
					        console.log(Array(72).join("=") + "\n\n");

					        // Show the entire file.
					        console.log(String(blob));
					        res.json({string: String(blob)});
					      });
					    });
					  });
					});
                }
                else {
                	res.status(400);
                }               
        });

        app.post('/createrepo', function(req, res) {

        });
};