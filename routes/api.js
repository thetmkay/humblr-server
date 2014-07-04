var mongo = require('./mongo'),
	Twit = require('twit'),
	credentials = require('./../config')|| process.env.credentials;

var T = new Twit({
    consumer_key: credentials.api_key, 
    consumer_secret: credentials.api_secret,
    access_token: credentials.access_key,
    access_token_secret:  credentials.access_secret
});

exports.setDb = function() {
	var db = require('mongoskin').db(credentials.dbUrl, {
		w: 1
	});
	mongo.loadDB(db);
};

exports.tweet = function(req,res) {

  var hey = "Hey @",
  	  segue = ", check out ",
      username = req.params.username,
      url = req.params.url,
      title = " (" + req.params.title + ")",
      url_length = 22;

  if(url.length < 22) {
    url_length = url.length;
  }

  var status = hey + username + segue;

  if(hey.length + username.length + segue.length + url_length + title.length >= 140) {
    status += req.params.title + " (" + url + ")";
  } else {
    status += url;
  }

  T.post('statuses/update', { status: status }, function(err, data, response) {
    console.log(err);
    res.json(data);
  });
  
};