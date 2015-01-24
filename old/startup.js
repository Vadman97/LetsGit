	var express = require('express')
	var app = express()

	function run_cmd(cmd, args, cb, end) {
		var spawn = require('child_process').spawn,
		child = spawn(cmd, args),
		me = this;
		child.stdout.on('data', function (buffer) { cb(me, buffer) });
		child.stdout.on('end', end);
	}

	app.get('/', function(req, res) {
		res.end('Hello World!')
	})
	app.get('/git-download', function (req, res) {
		res.send('hello!', 400);
		var foo = new run_cmd(
			'git pull origin master', [''],
			function (me, buffer) { me.stdout += buffer.toString() },
   			function () { console.log(foo.stdout) }
		);
		var foo2 = new run_cmd(
			'mkdir testing', [''],
			function (me, buffer) { me.stdout += buffer.toString() },
    			function () { console.log(foo.stdout) }
		);
	})
	app.listen(3000)
