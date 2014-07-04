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

exports.index = function(req,res) {
  console.log('hi');
  res.json({
  	content : "hello world"
  });
};

exports.tweet = function(req,res) {

  console.log(req.params.url);
  console.log(req.params.twitter_id);
  res.json({
  	"content": "hello world"
  });
  // T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  //   console.log(data);
  // })
};