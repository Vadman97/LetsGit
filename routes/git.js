var Repo = require('../models/repo.js');

var nodegit = require('nodegit');
var promisify = require("promisify-node");
var validator = require('validator');
var fse = promisify(require("fs-extra"));
var fs = require('fs');
var path = require('path');
var EasyZip = require('easy-zip').EasyZip;
var unzip = require('unzip');

exports.addRoutes = function(app) {
	app.get('/app', function(req, res) {
		res.render('index', { body: 'This is LetsGit' });
	});

	app.post('/clone', function(req, res) {
		var repoURL = req.body.url;
		var repoName = path.basename(repoURL, '.git');
		var pathName = "./repos/" + req.user._id + "/" + repoName + "/";		

		console.log(repoURL);
		console.log(repoName);
		console.log(pathName);
					
		fse.remove(pathName).then(function() {
			var entry;
			
			//TODO: Add error handling
			//TODO: Add url validation
			nodegit.Clone.clone(repoURL,
				pathName, {ignoreCertErrors: 1})
			  	.done(function() {
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

	app.post('/uploadrepo', function(req, res) {
		res.writeHead(200, { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*' // implementation of CORS
	    });
	    var fileName = req.body.fileName;
	    fileName = fileName.split('/').lastChild;
	    console.log(fileName);
	    req.on('data', function (chunk) {
			fs.createReadStream(chunk).pipe(unzip.Extract({ path: __dirname + "../repos/" + req.user._id + "/" }));	    
		});
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