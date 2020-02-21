var express = require('express');
var router = express.Router();
var postgresDB = require('../plugins/destPostgresDBConn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('destination router works')
});

router.get('/readtables', function(req, res, next) {
  console.log('getting DESTINATION database TABLES')
  var tables = []
  postgresDB.query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`, function (error, results, fields) {
    if (error) throw error
    for (var i = 0; i < results.rows.length; ++i) {
      tables.push(results.rows[i].table_name)
    }
    res.json(tables)
  })
})

router.get('/readcolumns', function(req, res, next) {
  var tables = []
  var obj = {
    name: '',
    columns: [
    ]
  }
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
})

module.exports = router;
