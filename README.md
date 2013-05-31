# Quai Mongo

## Index

* [What is this project?](#what-is-this-project?)
* [Run](#run)
* [Misc](#misc)

## What is this project?

This project provide logging for Quai Platform. It inserts messages to MongoDB.  
Click [here](https://git.corp.attinteractive.com/dstools/quai-log) for more details.  

## Run
    
    npm install

    insert = require('./index.js')('mongodb://localhost/quai', 'api')  # url to mongo and component
    insert({foo: 'bar'})

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
