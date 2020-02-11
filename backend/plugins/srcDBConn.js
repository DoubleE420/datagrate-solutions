var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.SRCDBHOST,
  user: process.env.SRCDBUSER,
  password: process.env.SRCDBPASS,
  database: 'datagrate'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId + ' to ' + process.env.SRCDBHOST + ' as user ' + process.env.SRCDBUSER);
});

module.exports = connection;
