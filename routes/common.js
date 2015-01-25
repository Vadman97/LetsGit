express = require('express');

var render = function(outer, page, vars, res) {
  express().render(page + '.ejs', vars, function(err, html) {
    if(err) {
      console.log(err);
    } else {
      vars.content = html;
      res.render(outer, vars);
    }
  });
}

renderDashboard = function(page, vars, res) {
	render('outer', page, vars, res);
}

renderHome = function(page, vars, res) {
	render('outerHome', page, vars, res);
}