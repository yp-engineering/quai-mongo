'use strict';

var db = require('./index.js');

var insert = db('mongodb://localhost/quai', 'loc', null, function(){ 
  insert({key: 'value'});
});


// insert({'key': 'value'}, function(err, message){
//   if(err) throw err;
//   console.log('insert successfuly', message);
// })
