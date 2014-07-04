/**
 * Module dependencies
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    api = require('./routes/api'),
    credentials = require('./config')|| process.env.credentials;

var app = module.exports = express();

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

app.get('/tweet/:username/:url/:title', api.tweet);

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
