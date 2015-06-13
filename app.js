var express        = require( 'express' ),
  app            = express(),
  server         = require( 'http' ).createServer( app ), 
  passport         = require( 'passport' ),
  util             = require( 'util' ),
  bodyParser       = require( 'body-parser' ),
  cookieParser     = require( 'cookie-parser' ),
  session          = require( 'express-session' ),
  GoogleStrategy   = require( 'passport-google-oauth2' ).Strategy;


//db signin
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//Google oAuth2 signin
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
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// configure Express// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/public'));
app.use( cookieParser()); 
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
  extended: true
}));
app.use( session({ 
  secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}));
app.use( passport.initialize());
app.use( passport.session());



app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/success', ensureAuthenticated, function(req, res){
  console.log(req.user)
  res.json(req.user)


});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get( '/auth/index/callback', 
      passport.authenticate( 'google', { 
        successRedirect: '/success',
        failureRedirect: '/login'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


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



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}



