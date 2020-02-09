var express = require('express');
var router = express.Router();
var db = require('../plugins/dbconn_db1.js');
// var db2 = require('../plugins/dbconn_db2.js');

var mysql = require('mysql');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('source router works')
});

router.post('/login', function(req, res, next) {
  db.login(req.body);
})

router.get('/init', function(req, res, next) {
  console.log('reading source databases')
  db.query('SHOW DATABASES', function (error, results, fields) {
    if (error) throw error
    console.log('read source databases')
    res.json(results)
  })
})

router.post('/readcolumns', function(req, res, next) {
  data = {
    name: '*',
    table: 'user_details'
  }
  console.log(data)
  console.log('reading columns')
  db.query('SELECT ' + data.name + `FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'` + data.table + `'`, function (error, results, fields) {
    if (error) throw error
    console.log('got columns')
    res.json(results)
  })
})

router.post('/readtables', function(req, res, next) {
  db.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error
    console.log('got tables')
    res.json(results)
  })
})

router.get('/all_data', function(req, res, next) {
  console.log('getting data')
  console.log(req.body)
  db.query('SELECT * FROM user_details', function (error, results, fields) {
    if (error) throw error
    // connected!
    console.log('got data')
    res.json(results)
  })
})

router.get('/user_id_column', function(req, res, next) {
  console.log('getting data')
  db.query(`SELECT user_id 
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
  db.query(`SELECT gender 
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
  db.query(sql, function (error, results, fields) {
    if (error) throw error
    // connected!
    console.log('got data')
    res.json(results)
  })
})

router.get('/male_columns', function(req, res, next) {
  console.log('getting data')
  db.query(`SELECT * 
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
