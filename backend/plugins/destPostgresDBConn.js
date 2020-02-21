const Pool = require('pg').Pool
require('dotenv').config();

const pool = new Pool({
  host: process.env.DESTDBHOST,
  user: process.env.DESTDBUSER,
  password: process.env.DESTDBPASS,
  port: process.env.DESTDBPORT,
  database: process.env.DESTDBDATABASE
})
 
pool.connect(function(err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }

  console.log('connected to ' + process.env.DESTDBHOST + ' as user ' + process.env.DESTDBUSER)
});

module.exports = pool;

