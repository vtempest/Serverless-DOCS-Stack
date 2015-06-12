var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var model = require('./models.js');
var Thread = model.Thread;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res) {
    (new Thread({title: req.query.title})).save();
    res.send("Created " + req.query.title);
});

router.get('/read', function(req, res) {
  Thread.find(function(err, threads) {
    res.json(threads);
  });
});

router.get('/read/:title?', function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread) {
        res.json(thread);
    })
});



module.exports = router;
