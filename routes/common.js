express = require('express');

render = function(page, vars, res) {
  express().render(page + '.ejs', vars, function(err, html) {
    if(err) {
      console.log(err);
    } else {
      vars.content = html;
      res.render('outer', vars);
    }
  });
}