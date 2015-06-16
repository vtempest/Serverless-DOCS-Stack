var express = require('express');
var app = express.Router();

var model = require('./models');
var Users = model.Users;

var passport = require( 'passport' ), 
  GoogleStrategy = require( 'passport-google-oauth2' ).Strategy,
  FacebookStrategy = require('passport-facebook').Strategy  


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


//from https://console.developers.google.com
passport.use(new GoogleStrategy({
    clientID: '985761....',
    clientSecret: 'o6fMu2y...',
    callbackURL: "http://localhost/auth/google/callback",
  },
  function(request, accessToken, refreshToken, profile, done) {
    new Users({
        email: profile.email,
        name: profile.displayName,
        profile: profile
      }).save();

    process.nextTick(function () {
      //register user here 
      return done(null, profile);
    });
  }
));


// from https://developers.facebook.com
passport.use(new FacebookStrategy({
    clientID: "576698....",
    clientSecret: "77abbf16....",
    callbackURL: "http://localhost/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //register user here 
      return done(null, profile);
    });
  }
));


app.use( passport.initialize());
app.use( passport.session());


app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){ });


app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });



app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));

app.get( '/auth/google/callback', 
      passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



app.get('/account', ensureAuthenticated, function(req, res){
  res.json(req.user)
  
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


module.exports = app;
