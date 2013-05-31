"use strict";

// module for sending messages to log collection in mongo
// parameters
// url to mongoDB
//
// return function that inserts the data
// parameters
// json message(string), component (string) and callback
//
// usage
// var db = require('./db.js')
// insert = db('mongodb://localhost/quai', 'loc')
//
// insert({'key': 'value'}, function(err){
//   if(err) throw err;
// })

// npm package
var MongoClient = require('mongodb').MongoClient;

// my modules
var formatMessage = require('./formatMessage.js');
var dbCon = null;

module.exports = function(dbUrl, component) {
  MongoClient.connect(dbUrl, function(err, db) {
    if(err) {
      console.error("Can't connect to MongoDB", err);
      return 1;
    };  

    console.log('connected to mongoDB', dbUrl);
    dbCon = db;
  });

  return function(message, cb) {
    if (!dbCon) {
      console.error("Can't insert to Mongo since the app is not connected. message:", message);
      return 1;
    }

    var now = new Date();
    message.date = now.getFullYear().toString() + pad(now.getMonth()) + pad(now.getDate());
    message.component = component;
    message = formatMessage(message);

    dbCon.collection('log').insert(message,
    function(err, device) {
      if (err) { 
        cb && cb("Error when Saving log in MongoDB", err);
      }
      else {
        cb && cb(null);
      }
    });
  };
};

function pad (str) { 
  str = String(str); 
  return (str.length < 2) ? "0" + str : str; 
}; 
