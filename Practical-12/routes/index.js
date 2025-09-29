var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/calculator', function(req, res, next) {
  res.render('calculator', { title: 'Calculator' });
});

router.post('/calculator', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operation = req.body.operation;
  let result;

  switch (operation) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': 
      result = num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
      break;
    default: result = 'Invalid operation';
  }

  res.render('calculator', { title: 'Calculator', result });
});

module.exports = router;
