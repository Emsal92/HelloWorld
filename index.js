var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

  app.get('/', function(request, response) {

    var html = '<form method="POST">'+
                '<input type="text" name="first" />' +
                '<input type="text" name="operator" />' +
                '<input type="text" name="second" />' +
                '<button>Submit</button>' +
                '</form>';

    response.status(200).send((html).toString());
  });

  app.post('/', function(request, response) {
    console.log(request.body);

    var firstNum = request.body.first;
    var operator = request.body.operator;
    var secondNum = request.body.second;

    var operation = Number(firstNum) + operator + Number(secondNum)

    var result = eval(operation);

    response.status(200).send((result).toString());
  });

app.listen(3000, function(){

console.log("server is listening");

});
