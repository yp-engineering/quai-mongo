'use strict';

var db = require('./index.js');
var message = {foo: 'bar'}

// example 1 - not using callbacks
var insert = db('mongodb://localhost/quai');
// wait a bit for db connection
setTimeout(function(){
  insert(message);
}, 100);

// =>
// connected to mongoDB mongodb://localhost/quai
// Saved to MongoDB. message: {"foo":"bar","_id":"51a908865dc559285f000001"}

// example 2 - using callbacks
var insert = db('mongodb://localhost/quai', function(err){ 
  if (err) { console.error(err); return 1; };
  console.log('Connected.');

  insert(message, function(err){
    if (err) { console.error(err); return 1; };

    console.log('Saved. message: ', message);
  });
});

// =>
// Connected.
// Saved. message:  { foo: 'bar' }
