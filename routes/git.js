var nodegit = require('nodegit');
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var validator = require('validator');
var path = "../repos/test";

exports.addRoutes = function(app) {
	app.get('/app', function(req, res) {
		res.render('index', { body: 'This is LetsGit' });
	});

	app.post('/clone', function(req, res) {
		var repoURL = req.body.url;
			
		// clone(repoURL, "../repos").then(function(repo) {

		fse.remove(path).then(function() {
			var entry;

			nodegit.Clone.clone(
				"https://github.com/nodegit/nodegit.git",
				path,
				{ ignoreCertErrors: 1})
			  	.then(function(repo) {
				return repo.getCommit("59b20b8d5c6ff8d09518454d4dd8b7b30f095ab5");
			  })
			  .then(function(commit) {
				return commit.getEntry("README.md");
			  })
			  .then(function(entryResult) {
				entry = entryResult;
				return entry.getBlob();
			  })
			  .done(function(blob) {
				console.log(entry.filename(), entry.sha(), blob.rawsize() + "b");
				console.log("========================================================\n\n");
				var firstTenLines = blob.toString().split("\n").slice(0, 10).join("\n");
				console.log(firstTenLines);
				console.log("...");
		});
					   
		});
	});

	app.post('/createrepo', function(req, res) {

	});
};