'use strict';

var db = require('./index.js')
var insert = db('mongodb://localhost/quai', 'loc')

insert({'key': 'value'}, function(err, message){
  if(err) throw err;
  console.log('insert successfuly', message);
})
