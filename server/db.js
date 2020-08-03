const pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native
require('dotenv').config() 

// var conString = process.env.REACT_APP_PG_STRING; //Can be found in the Details page
var conString = 	`postgres://csslmvrr:KuCNQMyVFayHEkIigel7Z6lDdjOIEUDT@ruby.db.elephantsql.com:5432/csslmvrr` //Can be found in the Details page

var client = new pg.Client(conString);

client
.connect()
.catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;