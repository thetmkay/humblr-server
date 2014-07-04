/**
 * Module dependencies
 */

var express = require('express'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    http = require('http'),
    path = require('path'),
    api = require('./routes/api'),
    credentials = require('./config')|| process.env.credentials,
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

var app = module.exports = express();


app.use(cookieParser()) // required before session.
app.use(session({
    secret: 'keyboard cat'
  , proxy: true // if you do SSL outside of node.
}))


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

// development only

//
//  tweet 'hello world!'
//
/**
 * Routes
 */

app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
      consumerKey: credentials.api_key,
      consumerSecret: credentials.api_secret,
      callback: 'http://localhost:3000/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile);
    }
));


app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/auth/twitter' }));

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res) {
  console.log('hi');
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
