var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.DESTDBHOST,
  user: process.env.DESTDBUSER,
  password: process.env.DESTDBPASS,
  port: process.env.DESTDBPORT,
  database: process.env.DESTDBDATABASE,
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId + ' to ' + process.env.DESTDBHOST + ' as user ' + process.env.DESTDBUSER);
});

module.exports = connection;
