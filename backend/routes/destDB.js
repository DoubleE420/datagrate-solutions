var express = require('express');
var router = express.Router();
var postgresDB = null;
var mysqlDB = null;
var dbType = null;

if (process.env.DESTDBTYPE === 'postgresql') {
  postgresDB = require('../plugins/destPostgresDBConn');
  dbType = 'postgres';
}

if (process.env.DESTDBTYPE === 'mysql') {
  mysqlDB = require('../plugins/destMysqlDBConn');
  dbType = 'mysql';
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('destination router works')
});

router.get('/readtables', function(req, res, next) {
  console.log('getting DESTINATION database TABLES')
  var tables = []
  if (process.env.DESTDBTYPE === 'postgresql') {
    postgresDB.query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`, function (error, results, fields) {
      if (error) throw error
      for (var i = 0; i < results.rows.length; ++i) {
        tables.push(results.rows[i].table_name)
      }
      res.json(tables)
    })
  }
  if (process.env.DESTDBTYPE === 'mysql') {
    mysqlDB.query('SHOW TABLES', function (error, results, fields) {
      if (error) throw error
      res.json(results)
    })
  }
})

router.get('/readcolumns', function(req, res, next) {
  var tables = []
  var obj = {
    name: '',
    columns: [
    ]
  }
  if (process.env.DESTDBTYPE === 'postgresql') {
    postgresDB.query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`, function (error, results, fields) {
      if (error) throw error
      for (var i = 0; i < results.rows.length; ++i) {
        var name = results.rows[i].table_name
        postgresDB.query(`SELECT column_name FROM information_schema.columns WHERE TABLE_NAME = '${name}'`, function (error2, columnResults, fields2) {
          // console.log(columnResults.rows)
          tables.push(name)
          obj.name = name
          obj.columns.push(name)
        })
        console.log('getting DESTINATION database COLUMNS for table ' + name)
      }
      console.log(obj)
      res.json(obj)
    })
  }
  mysqlDB.query(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'` + data.table + `'`, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

module.exports = router;
