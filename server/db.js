const pg = require('pg');
require('dotenv').config()

// var conString = `postgres://csslmvrr:KuCNQMyVFayHEkIigel7Z6lDdjOIEUDT@ruby.db.elephantsql.com:5432/csslmvrr` //Can be found in the Details page

// var client = new pg.Client(conString);

var client = new pg.Client(process.env.REACT_APP_PG_STRING);
// var client = new pg.Client(conString);

client.connect(function(err) {
  if (err) {
    return console.error('could not connect to PG', err);
  }
  console.log('DB Connected to Alex!');
})
  
module.exports = client;