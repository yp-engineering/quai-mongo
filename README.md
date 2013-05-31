# Quai Mongo

This module provide logging for Quai Platform. It inserts messages to MongoDB.  
Click [here](https://git.corp.attinteractive.com/dstools/quai-log) for more details

## Index

* [Examples](#examples)
* [Misc](#misc)

## Examples
    
 `npm install`

Exapmle 1 - not using callbacks

```js
'use strict';

var db = require('./index.js');
var message = {foo: 'bar'}

var insert = db('mongodb://localhost/quai', 'loc');
// wait a bit for db connection
setTimeout(function(){
  insert(message);
}, 100);

// =>
// connected to mongoDB mongodb://localhost/quai
// Saved to MongoDB. message: {"foo":"bar","_id":"51a908865dc559285f000001"}
```

example 2 - using callbacks
```js
var insert = db('mongodb://localhost/quai', 'loc', null, function(err){ 
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
```

## Methods

```js
var db = require('./index.js');
```

### db(mongoUrl, component, format, cb);

Connet to a MongoDB at `mongoUrl`. `component` is a string, `format` is an optional formatting functio and cb is optional callback. It returns a function that can do the inserts(see below).  
when connection established, cb(err) fires.


```js
var insert = db('mongodb://localhost/quai', 'loc');
```

### insert(message, cb);

Inserts `message` to MongoDB.  
When Insert is complete cb(err) is fired.


## Misc 

### Coding Guidlines

* Style Guide - http://nodeguide.com/style.html
* Avoid frameworks/abstractions ([web](http://expressjs.com/), [test](http://visionmedia.github.com/mocha/), [control flow](https://github.com/caolan/async)) untill you feel a pain
* "use strict" at the top of every js file
* Process monitoring - I like forever
* GET /health end-point
* Single entry point for dependencies and using Mocks during unit tests
* App should be able to run as a command line app. app = require('./app')
* Use Callbacks when you want to know if something has finished. app.init(doneInit); app.start(readyToServe);
* Use Event Emitter when you want to notify someone multiple times or when you have many listeners
