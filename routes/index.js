
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { body: 'This is LetsGit' });
};

exports.gitPull = function(req, res) {
	res.send("Pulled!", 400);
};

function run_cmd(cmd, args, cb, end) {
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args),
        me = this;
    child.stdout.on('data', function (buffer) { cb(me, buffer) });
    child.stdout.on('end', end);
}