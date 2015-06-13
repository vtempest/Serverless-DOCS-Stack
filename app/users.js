var express = require('express');
var router = express.Router();

var model = require('./models');
var Users = model.Users;



router.get('/', function(req, res, next) {
   Users.find(function(err, items) {
    res.json(items);
  });
});


router.get('/total', function(req, res, next) {

	Users.count({}, function( err, count){
		 res.send(count);
	})

});



router.get('/:email?', function(req, res) {
    Users.findOne({email: req.params.email}, function(error, user) {
        if(user)
        	res.json(user);
        else
        	res.send("No user with email "+req.params.email)
    })
});




module.exports = router;
