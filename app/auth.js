var express = require('express');
var app = express.Router();

var model = require('./models');
var Users = model.Users;




//Google oAuth2 signin
var  passport = require( 'passport' ), 
 	GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
   	clientID: '675454780693-7n34ikba11h972dgfc0kgib0id9gudo8.apps.googleusercontent.com',
    clientSecret: '8TbemY_MUonCCRhhuIjwV-ho',
    callbackURL: "http://testing.com/auth/index/callback",
  },
  function(request, accessToken, refreshToken, profile, done) {
    new Users({
        email: profile.email,
        name: profile.displayName,
        profile: profile
      }).save();

    process.nextTick(function () {
    	//register

      return done(null, profile);
    });
  }
));

app.use( passport.initialize());
app.use( passport.session());



app.get('/login', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));

app.get( '/auth/index/callback', 
      passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



app.get('/success', ensureAuthenticated, function(req, res){
  
  res.json(req.user)


});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}



module.exports = app;