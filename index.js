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
//

// core module

var util = require('util');

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
      var msg = "Can't insert message since there is no connection to MongoDB.";

      if(cb) {
        cb(msg); 
        return 1;
      };

      console.error(util.format('%s message: %j', msg, clonedMessage));
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

// function insert (message, cb) {
//   var clonedMessage = {};
//   Object.keys( message ).forEach(function ( k ) {
//     clonedMessage[k] = message[k];
//   });
// 
//   if (!dbCon) {
//     var msg = "Can't insert to Mongo since the app is not connected. message:", clonedMessage;
// 
//     if(cb) {
//       cb(msg); 
//       return 1;
//     };
// 
//     console.error(msg);
//     return 1;
//   };
// 
//   if (formatMessage) {
//     clonedMessage = formatMessage(clonedMessage);
//   };
//   // var now = new Date();
//   // clonedMessage.meta.date = now.getFullYear().toString() + pad(now.getMonth()) + pad(now.getDate());
//   // clonedMessage.meta.component = component;
//   // clonedMessage = formatMessage(clonedMessage);
// 
//   dbCon.collection('log').insert(clonedMessage,
//   function(err, device) {
//     if (err) { 
//       var msg = 'Error when Saving log in MongoDB';
//       if (cb) {
//         cb(msg, err); 
//         return 1;
//       }
// 
//       console.error(msg, err);
//       return 1;
//     }
// 
//     if (cb) {
//       cb(null, clonedMessage);
//       return 1;
//     }
// 
//     console.log("Saved to MongoDB", clonedMessage);
//   });
// };

function pad (str) { 
  str = String(str); 
  return (str.length < 2) ? "0" + str : str; 
}; 
