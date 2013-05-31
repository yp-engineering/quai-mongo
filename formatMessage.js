"use strict";

// format a message to fit into our needs.
// it makes it easier to store in the grid
module.exports = function (message) {
  var now = new Date();

  var res = {
    meta: {
    id: message.meta.id,
    status: message.meta.status,
    date: message.meta.date,
    component: message.meta.component,
    topic: message.topic,
    message: {
    
    }
  };

  delete message.topic;
  res.message = message;
  return res;
};

function pad (str) { 
  str = String(str); 
  return (str.length < 2) ? "0" + str : str; 
}; 
