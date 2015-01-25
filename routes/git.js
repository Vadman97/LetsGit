var Repo = require('../models/repo.js');

var nodegit = require('nodegit');
var promisify = require("promisify-node");
var validator = require('validator');
var fse = promisify(require("fs-extra"));
var fs = require('fs');
var path = require('path');
var EasyZip = require('easy-zip').EasyZip;

exports.addRoutes = function(app) {
	app.get('/app', function(req, res) {
		res.render('index', { body: 'This is LetsGit' });
	});

	app.post('/clone', function(req, res) {
		var repoURL = req.body.url;
		var repoName = path.basename(repoURL, '.git');
		var pathName = "./repos/" + req.user._id + "/" + repoName;		
					
		fse.remove(pathName).then(function() {
			var entry;
			
			//TODO: Add error handling
			//TODO: Add url validation
			nodegit.Clone.clone(repoURL,
				pathName, {ignoreCertErrors: 1})
			  	.done(function() {
			  		//post to s3
				var testRepo = new Repo({
					name: repoName, 
					path: pathName, 
					createdAt: new Date().toJSON(),
					updatedAt: new Date().toJSON(),
					userId: req.user._id
				});
				testRepo.save();
				res.json({repoURL: pathName});
			});					   
		});
	});

	app.post('/createrepo', function(req, res) {

	});

	app.get('/download/:repoName', function(req, res) {
		var repoName = req.params.repoName;
		var projectDirectory = __dirname + "/../repos/" + req.user._id + "/" + repoName;
		var destinationURL = __dirname + "/../downloads/" + req.user._id + "-" + repoName + ".zip"

		var zip = new EasyZip();
		
		zip.zipFolder(projectDirectory, function() {
    		zip.writeToFile(destinationURL);
		});

		res.sendfile(path.resolve(destinationURL));

	});
};