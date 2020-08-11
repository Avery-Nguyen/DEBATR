const pg = require('pg');
require('dotenv').config()


// var client = new pg.Client(conString);

var client = new pg.Client(process.env.REACT_APP_PG_STRING);
// var client = new pg.Client(conString);

client.connect(function(err) {
  if (err) {
    return console.error('could not connect to PG', err);
  }
  console.log('DB Connected!');
})
  
module.exports = client;