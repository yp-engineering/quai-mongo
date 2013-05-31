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
// var formatMessage = require('./formatMessage.js');
var dbCon = null;

module.exports = function(dbUrl, component, formatMessage, cb) {
  MongoClient.connect(dbUrl, function(err, db) {
    if(err) {
      if (cb) {
        cb(err); 
        return 1;
      } 

      console.error("Can't connect to MongoDB", err);
      return 1;
    };  

    dbCon = db;

    if (cb) {
      cb(null); 
      return 1;
    } 

    console.log('connected to mongoDB', dbUrl);
  });

  return function(message, cb) {
    var clonedMessage = {};
    Object.keys( message ).forEach(function ( k ) {
      clonedMessage[k] = message[k];
    });

    if (!dbCon) {
      var message = "Can't insert to Mongo since the app is not connected. message:", clonedMessage;

      if(cb) {
        cb(message); 
        return 1;
      };

      console.error(message);
      return 1;
    };

    if (formatMessage) {
      clonedMessage = formatMessage(clonedMessage);
    };
    // var now = new Date();
    // clonedMessage.meta.date = now.getFullYear().toString() + pad(now.getMonth()) + pad(now.getDate());
    // clonedMessage.meta.component = component;
    // clonedMessage = formatMessage(clonedMessage);

    dbCon.collection('log').insert(clonedMessage,
    function(err, device) {
      if (err) { 
        cb && return cb("Error when Saving log in MongoDB", err);
        console.error("Error when Saving log in MongoDB", err);
      }
      else {
        cb && cb(null, clonedMessage) && return 1;
        console.log("Saved to MongoDB", clonedMessage);
      }
    });
  };
};

function pad (str) { 
  str = String(str); 
  return (str.length < 2) ? "0" + str : str; 
}; 
