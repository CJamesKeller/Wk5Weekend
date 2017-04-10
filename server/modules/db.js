//Basic DB connection stuff
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/general';
var mongoURI = "mongodb://firstOne:mlab1123@ds143030.mlab.com:43030/cjameskeller-first";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ' + err);
});

MongoDB.once('open', function(){
  console.log('Connected to Mongo');
});

module.exports = MongoDB;
