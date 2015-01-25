var nodegit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
var Repo = require('../models/repo.js');

exports.addRoutes = function(app) {
  app.get('/pushRepo/:id', function(req, res) {
    var repo = Repo.findOne({_id: req.param('id')}, function(error, data) {
      nodegit.Repository.open(path.resolve(__dirname + '/../' + data.path))
      .then(function(repository) {
  return nodegit.Remote.load(repository, "origin")
    .then(function(remote) {
      remote.connect(nodegit.Enums.DIRECTION.PUSH);

      var push;

      // We need to set the auth on the remote, not the push object
      remote.setCallbacks({
        credentials: function(url, userName) {
          return nodegit.Cred.userpassPlaintextNew(req.body.username, req.body.password);
        }
      });

      // Create the push object for this remote
      return nodegit.Push.create(remote)
      .then(function(pushResult) {
        push = pushResult;

        // This just says what branch we're pushing onto what remote branch
        return push.addRefspec("refs/heads/master:refs/heads/master");
      }).then(function() {
        // This is the call that performs the actual push
        return push.finish();
      }).then(function() {
        // Check to see if the remote accepted our push request.
        return push.unpackOk();
      });
    });
}).done(function() {
  console.log("Done!");
});
    });
  });
}
