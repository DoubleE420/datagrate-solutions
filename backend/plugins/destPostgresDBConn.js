const Pool = require('pg').Pool
require('dotenv').config();

const pool = new Pool({
  host: process.env.POSTGRESHOST,
  user: process.env.POSTGRESUSER,
  password: process.env.POSTGRESPASS,
  port: process.env.POSTGRESPORT,
  database: process.env.POSTGRESDATABASE
})
 
pool.connect(function(err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }

  console.log('connected to ' + process.env.POSTGRESHOST + ' as user ' + process.env.POSTGRESUSER)
});

module.exports = pool;

