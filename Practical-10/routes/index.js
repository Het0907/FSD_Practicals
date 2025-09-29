var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET /view-log?file=error.txt
router.get('/view-log', (req, res) => {
  const fileName = req.query.file || 'error.txt';
  const logPath = path.join(__dirname, '../logs', fileName);

  fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) {
      return res.render('log-view', { 
        log: null, 
        error: 'Log file not found or inaccessible.' 
      });
    }
    res.render('log-view', { log: data, error: null });
  });
});


module.exports = router;
