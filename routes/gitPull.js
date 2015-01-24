var express = require('express');
var router = express.Router();

//Git auto pull on push
router.post('/', function(req, res) {
	console.log("Pulling...")
	run_cmd("git pull origin master");
	console.log("Pulled!");
	res.send("Pulled!", 400);
});

function run_cmd(cmd) {
    var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec(cmd, puts);
}