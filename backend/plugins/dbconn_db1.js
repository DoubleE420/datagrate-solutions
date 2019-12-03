var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host: 'database-1',
  user: 'root',
  password: process.env.DBPASS,
  database: 'datagrate'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId + ' to database-1');
});

module.exports = connection;