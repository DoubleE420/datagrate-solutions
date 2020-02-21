var express = require('express');
var router = express.Router();
var srcDB = require('../plugins/srcDBConn.js');

const { exec } = require('child_process')

function plsWork (req, res, next) {
  console.log('\nRequest in plsWork:')
  console.log(req)
  console.log('END OF REQUEST\n')
  srcDB.query(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'` + req + `'`, function (error, results, fields) {
    if (error) throw error
    var obj = {
      name: req,
      columns: [
      ]
    }
    for (var i = 0; i < results.length; ++i) {
      colName = results[i].COLUMN_NAME
      obj.columns.push(colName)
    }
    console.log('\nplsWork Object:')
    console.log(obj)
    return obj
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('source router works')
});

router.post('/startmigration', function(req, res, next) {
  data = req.body.dbType
  console.log('Migrating to: ' + data)
  switch (data) {
    case 'None':
      res.send('Invalid type')
      break
    case 'PostgreSQL':
      exec(`pgloader mysql://${process.env.SRCDBUSER}:${process.env.SRCDBPASS}@${process.env.SRCDBHOST}/${process.env.SRCDBDATABASE} pgsql://${process.env.DESTDBUSER}:${process.env.DESTDBPASS}@${process.env.DESTDBHOST}/${process.env.DESTDBDATABASE}`, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
        }
        if (stderr) {
          console.log(stderr)
        }
        console.log(stdout)
        res.send(stdout)
      })
      break
    case 'MySQL':
      exec(`mysqldump -h ${process.env.SRCDBHOST} -P ${process.env.SRCDBPORT} -u ${process.env.SRCDBUSER} -p${process.env.SRCDBPASS} --all-databases > /dbdump/${process.env.SRCDBHOST}-all-databases.sql`, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
        }
        if (stderr) {
          console.log(error)
        }
        console.log(stdout)
      })
      exec(`mysql -h ${process.env.DESTDBHOST} -P ${process.env.DESTDBPORT} -u ${process.env.DESTDBUSER} -p${process.env.DESTDBPASS} ${process.env.DESTDBDATABASE} < /dbdump/${process.env.SRCDBHOST}-all-databases.sql`, (importerror, importstdout, importstderr) => {
        if (importerror) {
          console.log(importerror)
        }
        if (importstderr) {
          console.log(importstderr)
        }
        console.log(importstdout)
      })
      break
  }
})

router.get('/init', function(req, res, next) {
  console.log('\nINIT\n')
  var obj = []
  srcDB.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error
    else if (results) {
      console.log('\n/init Results:')
      for (var i = 0; i < results.length; ++i) {
        var name = Object.values(results[i]).toString()
        obj.push(plsWork(name, res))
      }
      console.log('\n/init Object:')
      console.log(obj)
      console.log('END OF INIT OBJECT\n')
      res.send(obj)
    }
  })
})

router.post('/readcolumns', function(req, res, next) {
  data = req.body
  srcDB.query(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'` + data.table + `'`, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

router.get('/readtables', function(req, res, next) {
  srcDB.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

router.post('/all_data', function(req, res, next) {
  console.log('getting data')
  var column = req.body.column
  var table = req.body.table
  srcDB.query('SELECT `'+ column + '` FROM ' + table, function (error, results, fields) {
    if (error) throw error
    // connected!
    console.log('got data')
    res.json(results)
  })
})

module.exports = router;
