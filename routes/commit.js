var nodegit = require("nodegit");
var path = require("path");
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var Repo = require("../models/repo.js");
var fs = require('fs');

exports.addRoutes = function(app) {
	app.get('/commitRepo/:id', function(req, res){
    var repo;
    var index;
    var oid;
    Repo.findOne({_id: req.param("id")}, function(error, data) {
      nodegit.Repository.open(path.resolve(__dirname + '/../' + data.path))
      .then(function(repoResult){
        repo = repoResult;
        return fse.ensureDir(path.join(repo.workdir(), data.path));
      })
      .then(function() {
        return repo.openIndex();
      })
      .then(function(idx) {
        index = idx;
        return index.read(1);
      })
      .then(function() {
        fs.readdir(path.resolve(__dirname + '/../' + data.path), function(error, files) {
          for (i in files) {
            index.addByPath(files[i]);
          }
        });
      })
      .then(function() {
        fs.readdir(path.resolve(__dirname + '/../' + data.path), function(error, files) {
          for (i in files) {
            index.addByPath(path.join(data.path, files[i]));
          }
        });
      })
      .then(function() {
        return index.write();
      })
      .then(function() {
        return index.writeTree();
      })
      .then(function(oidResult) {
        oid = oidResult;
        return nodegit.Reference.nameToId(repo, "HEAD");
      })
      .then(function(head) {
        return repo.getCommit(head);
      })
      .then(function(parent) {
        var author = nodegit.Signature.create(req.user.email, req.user.email, 123456789, 60);
        var committer = nodegit.Signature.create(req.user.email,
          req.user.email, 987654321, 90);

        return repo.createCommit("HEAD", author, committer, "message", oid, [parent]);
      })
      .done(function(commitId) {
        console.log("New Commit: ", commitId);
        res.redirect("/project/" + data._id);
      });
    });
  });
};
