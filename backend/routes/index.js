var express = require('express');
var router = express.Router();
var db = require('../plugins/dbconn_db1.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('test')
});

router.get('/all_data', function(req, res, next) {
  console.log('getting data')
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
