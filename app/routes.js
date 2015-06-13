var express = require('express');
var router = express.Router();

var model = require('./models');
var Users = model.Thread;


//Google OAuth2
/*
var passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;



router.use( passport.initialize());
router.use( passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

 
passport.use(new GoogleStrategy({
    clientID:     '675454780693-7n34ikba11h972dgfc0kgib0id9gudo8.apps.googleusercontent.com',
    clientSecret: '8TbemY_MUonCCRhhuIjwV-ho',
    callbackURL: "http://testing.com/auth/index/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
   	console.log(profile);


     new Users({googleId: profile.id}).save();
   
	 
	   process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });



  }
));


router.get('/auth/google',
  passport.authenticate('google', { scope: 
    [ 'https://www.googleapis.com/auth/plus.login',
    , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));
 
router.get( '/auth/index/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

*/


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/auth/google/success', function(req, res, next) {
 console.log(req.user)
	res.json(req.user)
	

});

router.get('/auth/google/failure', function(req, res, next) {

	

});




router.get('/', function(req, res, next) {

	
  res.render('index', { user: req.user });


	 

});


router.use('/users', require('./users'));



module.exports = router;
