var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASS,
  port: process.env.MYSQLPORT,
  database: process.env.MYSQLDATABASE,
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId + ' to ' + process.env.MYSQLHOST + ' as user ' + process.env.MYSQLUSER);
});

module.exports = connection;
