var express = require('express');
var router = express.Router();
var srcDB = require('../plugins/srcDBConn.js');
var destDB = require('../plugins/destDBConn.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('source router works')
});

router.get('/init', function(req, res, next) {
  console.log('reading source databases')
  srcDB.query('SHOW DATABASES', function (error, results, fields) {
    if (error) throw error
    console.log('read source databases')
    res.json(results)
  })
})

router.post('/readcolumns', function(req, res, next) {
  data = req.body
  srcDB.query(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'` + data.table + `'`, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

router.post('/readtables', function(req, res, next) {
  srcDB.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

router.get('/all_data', function(req, res, next) {
  console.log('getting data')
  console.log(req.body)
  srcDB.query('SELECT * FROM user_details', function (error, results, fields) {
    if (error) throw error
    // connected!
    console.log('got data')
    res.json(results)
  })
})

router.get('/user_id_column', function(req, res, next) {
  console.log('getting data')
  srcDB.query(`SELECT user_id 
              FROM user_details 
              `, function (error, results, fields) {
    if (error) throw error
    // connected!
    console.log('got data')
    res.json(results)
  })
})

router.get('/gender_column', function(req, res, next) {
  console.log('getting data')
  srcDB.query(`SELECT gender 
              FROM user_details 
              `, function (error, results, fields) {
    if (error) throw error
    // connected!
    console.log('got data')
    res.json(results)
  })
})

router.get('/name_columns', function(req, res, next) {
  console.log('getting data')
  var sql = `SELECT 
  first_name, 
  last_name 
    FROM user_details 
    `
  srcDB.query(sql, function (error, results, fields) {
    if (error) throw error
    // connected!
    console.log('got data')
    res.json(results)
  })
})

router.get('/male_columns', function(req, res, next) {
  console.log('getting data')
  srcDB.query(`SELECT * 
              FROM user_details
              WHERE gender = 'male'  
              `, function (error, results, fields) {
    if (error) throw error
    // connected!
    console.log('got data')
    res.json(results)
  })
})
module.exports = router;
