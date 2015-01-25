var nodegit = require('nodegit');
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var validator = require('validator');
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-1';

exports.addRoutes = function(app) {
	app.get('/app', function(req, res) {
		res.render('index', { body: 'This is LetsGit' });
	});

	app.post('/clone', function(req, res) {
		// var path = "/tmp/" + req.user._id + ;
		var path = "/tmp/asd";
		var repoURL = req.body.url;
			
		fse.remove(path).then(function() {
			var entry;

			nodegit.Clone.clone(
				"https://github.com/sathyasom/test.git",
				path,
				{ ignoreCertErrors: 1})
			  	.then(function(repo) {
				return repo.getCommit("571da7b66408b8a5839eb5682856f846386514a3");
			  })
			  .then(function(commit) {
				return commit.getEntry("test.txt");
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

				var s3bucket = new AWS.S3({params: {Bucket: 'letsgit'}});
				s3bucket.createBucket(function() {
				  var params = {Key: 'myKey', Body: 'Hello!'};
				  s3bucket.upload(params, function(err, data) {
				    if (err) {
				      console.log("Error uploading data: ", err);
				    } else {
				      console.log("Successfully uploaded data to myBucket/myKey");
				    }
				  });
				});

				res.json({message: "test"});
		});
					   
		});
	});

	app.post('/createrepo', function(req, res) {

	});
};