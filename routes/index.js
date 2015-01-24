var express = require('express');
var router = express.Router();

//Home page
router.get('/', function(req, res){
	res.render('index', { body: 'This is LetsGit' });
});