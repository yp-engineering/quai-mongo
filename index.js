"use strict";

// module for sending messages to log collection in mongo
//
// Usage:
// var db = require('quai-mongo');
// var message = {foo: 'bar'}
// 
// var insert = db('mongodb://localhost/quai', function(err){ 
//   if (err) { console.error(err); return 1; };
//   console.log('Connected.');
// 
//   insert(message, function(err){
//     if (err) { console.error(err); return 1; };
// 
//     console.log('Saved. message: ', message);
//   });
// });

// =>
// Connected.
// Saved. message:  { foo: 'bar' }

// core module

var util = require('util');

// npm package
var MongoClient = require('mongodb').MongoClient;

// my modules
// var formatMessage = require('./formatMessage.js');
var dbCon = null;

module.exports = function(dbUrl, cb) {
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
      var msg = "Can't insert message since there is no connection to MongoDB.";

      if(cb) {
        cb(msg); 
        return 1;
      };

      console.error(util.format('%s message: %j', msg, clonedMessage));
      return 1;
    };

    dbCon.collection('log').insert(clonedMessage,
    function(err, device) {
      if (err) { 
        var msg = 'Error when Saving log in MongoDB. error:' + err;
        if (cb) {
          cb(msg); 
          return 1;
        }

        console.error(msg);
        return 1;
      }

      if (cb) {
        cb(null, clonedMessage);
        return 1;
      }

      console.error(util.format('Saved to MongoDB. message: %j', clonedMessage));
    });
  };
};
