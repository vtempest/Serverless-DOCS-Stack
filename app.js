var express = require('express'),
app = express(),
server = require('http').createServer(app), 
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session');


//db signin
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


//middleware
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ 
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}));


//routes
app.use('/', require('./app/routes'));


//errors
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("<pre>"+(app.get('env') === 'development'? err.stack : err.message) +"</pre>");
});


//run server
server.listen(80);
console.log("SERVER STARTED ON PORT 80")