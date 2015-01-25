var nodegit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
var Repo = require('../models/repo.js');

exports.addRoutes = function(app) {
	console.log("starting push!");
  app.get('/pushRepo/:id', function(req, res) {
    var repo = Repo.findOne({_id: req.param('id')}, function(error, data) {
      nodegit.Repository.open(path.resolve(__dirname + '/../' + data.path))
      .then(function(repository) {
        nodegit.Remote.remove(repository, "origin");
	console.log("returning new repository");
        return nodegit.Remote.create(repository, "origin",
              data.remoteURL);
      })
      .then(function(remote) {
	console.log("connecting to new repository");
        remote.connect(nodegit.Enums.DIRECTION.PUSH);

        var push;

      // We need to set the auth on the remote, not the push object
      remote.setCallbacks({
        credentials: function(url, userName) {
	console.log("returning login info");
          return nodegit.Cred.userpassPlaintextNew(req.body.username, req.body.password);
        }
      });

      // Create the push object for this remote
      return nodegit.Push.create(remote)
      .then(function(pushResult) {
	console.log("push result: " + pushResult);
        push = pushResult;

        // This just says what branch we're pushing onto what remote branch
        return push.addRefspec("refs/heads/master:refs/heads/master");
      }).then(function() {
        // This is the call that performs the actual push
        return push.finish();
      }).then(function() {
	console.log("Unpack!");
        // Check to see if the remote accepted our push request.
        return push.unpackOk();
      });
    });
})
    });
}
