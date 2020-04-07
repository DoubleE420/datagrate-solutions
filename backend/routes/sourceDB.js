var express = require('express');
var router = express.Router();
var srcDB = require('../plugins/srcDBConn.js');

const { exec } = require('child_process')

// build custom JSON object to have both tables and columns in the "migrate" page
function plsWork (req, res, next) {
  // console.log('\nRequest in plsWork:')
  // console.log(req)
  // console.log('END OF REQUEST\n')
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
    // console.log('\nplsWork Object:')
    // console.log(obj)
    return obj
  })
}

// sanity check to make sure backend is online
router.get('/', function(req, res, next) {
  res.send('source router works')
});

// /api/source/startmigration endpoint, starts themigration from mysql to postgresql
router.post('/startmigration', function(req, res, next) {
  data = req.body.dbType.dbType
  tableName = req.body.dbType.currentTable
  switch (data) {
    case 'None':
      res.send('Invalid type')
      break
    // if the user clicks the "PostgreSQL" on the migrate page..... use pgloader and migrate it to postgresql
    case 'PostgreSQL':
      exec(`pgloader mysql://${process.env.SRCDBUSER}:${process.env.SRCDBPASS}@${process.env.SRCDBHOST}/${process.env.SRCDBDATABASE} pgsql://${process.env.POSTGRESUSER}:${process.env.POSTGRESPASS}@${process.env.POSTGRESHOST}/${process.env.POSTGRESDATABASE}`, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
        }
        if (stderr) {
          console.log(stderr)
        }
        console.log(stdout)
        res.send(stdout).status(200)
      })
      break
    // if the user clicks the "MySQL" on the migration page..... dump the database to a .sql file then import it into the new database
    case 'MySQL':
      // dumps the database to a file
      exec(`mysqldump -h ${process.env.SRCDBHOST} -P ${process.env.SRCDBPORT} -u ${process.env.SRCDBUSER} -p${process.env.SRCDBPASS} ${process.env.SRCDBDATABASE} ${tableName} > /dbdump/${process.env.SRCDBHOST}-${process.env.SRCDBDATABASE}-${tableName}.sql`, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
        }
        if (stderr) {
          console.log(error)
        }
        console.log('Export STDOUT: ')
        console.log(stdout)
        console.log('exported file, importing.....')
        // imports the dumped file into the new database
        srcDB.query(`USE ${process.env.MYSQLDATABASE}`)
        exec(`mysql -h ${process.env.MYSQLHOST} -P ${process.env.MYSQLPORT} -u ${process.env.MYSQLUSER} -p${process.env.MYSQLPASS} ${process.env.MYSQLDATABASE} < /dbdump/${process.env.SRCDBHOST}-${process.env.SRCDBDATABASE}-${tableName}.sql`, (importerror, importstdout, importstderr) => {
          if (importerror) {
            console.log(importerror)
          }
          if (importstderr) {
            console.log(importstderr)
          }
          console.log('Import STDOUT: ')
          console.log(importstdout)
          res.send(importstdout)
          console.log('imported file and sent stdout')
        })
      })
      
      break
  }
})

// reads the tables from the source database
router.get('/init', function(req, res, next) {
  // console.log('\nINIT\n')
  var obj = []
  srcDB.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error
    else if (results) {
      // console.log('\n/init Results:')
      for (var i = 0; i < results.length; ++i) {
        var name = Object.values(results[i]).toString()
        obj.push(plsWork(name, res))
      }
      // console.log('\n/init Object:')
      // console.log(obj)
      // console.log('END OF INIT OBJECT\n')
      res.send(obj)
    }
  })
})

// read the columns from the table that's selected
router.post('/readcolumns', function(req, res, next) {
  data = req.body
  srcDB.query(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'` + data.table + `'`, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

// read all tables in the database
router.get('/readtables', function(req, res, next) {
  srcDB.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

// endpoint to pull all data
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
