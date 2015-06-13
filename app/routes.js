var express = require('express');
var app = express.Router();

var model = require('./models');
var Users = model.Thread;

//auth
app.use('/', require('./auth') );

//forever autorefresh
app.get('/refresh', function(){});


//routes
app.all('/', function(req, res){
	//console.log(req.user);

  res.render('index', { user: req.user });
});


app.use('/users', require('./users'));
app.use('/posts', require('./posts'));

module.exports = app;