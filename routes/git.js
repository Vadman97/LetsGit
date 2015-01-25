var nodegit = require('nodegit');
var promisify = require("promisify-node");
var validator = require('validator');
var fse = promisify(require("fs-extra"));
var fs = require('fs');
var path = require('path');

var creds = require('./creds');

// var AWS = require('aws-sdk');
// AWS.config.region = 'us-west-1';
// AWS.config.update({
// 	accessKeyId: creds.AWS_ACCESS_KEY,
// 	secretAccessKey: creds.AWS_SECRET_KEY
// });

// var s3 = new AWS.S3();

exports.addRoutes = function(app) {
	app.get('/app', function(req, res) {
		res.render('index', { body: 'This is LetsGit' });
	});

	app.post('/clone', function(req, res) {
		var repoURL = req.body.url;
		var repoName = path.basename(repoURL, '.git');
		var pathName = "/repos/" + req.user._id + "/" + repoName;
		console.log(pathName);		
					
		fse.remove(pathName).then(function() {
			var entry;
			
			//TODO: Add error handling
			nodegit.Clone.clone("https://github.com/sathyasom/test.git",
				pathName, {ignoreCertErrors: 1})
			  	.done(function() {
			  		//post to s3

				res.json({message: "test"});
			});					   
		});
	});

	app.post('/createrepo', function(req, res) {

	});
};