var express = require('express');
var router = express.Router();
var postgresDB = require('../plugins/destPostgresDBConn');
var mysqlDB = require('../plugins/destMysqlDBConn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('destination router works')
});


router.post('/readtables', function(req, res, next) {
  console.log('getting DESTINATION database TABLES')
  var type = (req.body.dbType).toLowerCase()
  console.log('type: ')
  console.log(type)
  var tables = []
  if (type === 'postgresql') {
    postgresDB.query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      for (var i = 0; i < results.rows.length; ++i) {
        tables.push(results.rows[i].table_name)
      }
      if (tables) {
        console.log('sending ' + type + ' tables')
        res.json(tables)
      }
    })
  }
  if (type === 'mysql') {
    mysqlDB.query(`USE ${process.env.MYSQLDATABASE}`)
    mysqlDB.query(`SHOW TABLES`, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      if (results) {
        console.log('sending ' + type + ' tables')
        res.json(results)
      }
    })
  }
})

router.post('/readcolumns', function(req, res, next) {
  var tables = []
  var type = (req.body.dbType).toLowerCase()
  var obj = {
    name: '',
    columns: [
    ]
  }
  if (type === 'postgresql') {
    postgresDB.query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      for (var i = 0; i < results.rows.length; ++i) {
        var name = results.rows[i].table_name
        console.log('getting DESTINATION database COLUMNS for table ' + name)
        postgresDB.query(`SELECT column_name FROM information_schema.columns WHERE TABLE_NAME = '${name}'`, function (error2, columnResults, fields2) {
          // console.log(columnResults.rows)
          tables.push(name)
          obj.name = name
          obj.columns.push(name)
        })
      }
      console.log('sending columns for ' + type)
      if (obj.name !== '') {
        console.log(obj)
        res.json(obj)
      }
    })
  }
  
  if (type === 'mysql') {
    mysqlDB.query(`USE ${process.env.MYSQLDATABASE}`)
    mysqlDB.query(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'` + data.table + `'`, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      if (results) {
        console.log('sending columns for ' + type)
        res.send(results)
      }
    })
  }
})

router.get('/reset', function(req, res, next) {
  console.log('resetting destination tables...')
  var pgResult = null
  var mysqlResult = null
  postgresDB.query(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;`, function (error, results, fields) {
    pgResult = results
  })
  mysqlDB.query(`DROP DATABASE ${process.env.MYSQLDATABASE}`, function (error, results, fields) {
    console.log(results)
    mysqlDB.query(`CREATE DATABASE ${process.env.MYSQLDATABASE}`, function (error, results, fields) {
      console.log(results)
    })
    mysqlResult = results
  })
  res.send('OK').status(200)
})

module.exports = router;
