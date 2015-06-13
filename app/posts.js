var express = require('express');
var router = express.Router();

var model = require('./models');
var Posts = model.Posts;

router.get('/', function(req, res, next) {
   Posts.find(function(err, items) {
    res.json(items);
  });
});


router.get('/create', function(req, res) {
    new Posts({text: req.query.text, author: req.user.displayName}).save();
    res.send("Created Post: " + req.query.text);
});





module.exports = router;
