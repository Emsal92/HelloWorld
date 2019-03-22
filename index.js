var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

// parse application/json
app.use(bodyParser.json());

  app.get('/', function(request, response) {
    var something = '';
    if(request.session.loggedIn) {
      something = 'session is created';
    } else
      something = 'there are no sessions';

    var html = '<form method="POST">'+
                '<label>'+something+'</label>'+
                '<input type="text" name="first" />' +
                '<input type="text" name="operator" />' +
                '<input type="text" name="second" />' +
                '<button>Submit</button>' +
                '</form>';

    response.status(200).send((html).toString());
  });

  app.get('/login', function(request, response) {
    var html = '<form method="POST">'+
                '<input type="text" name="username" />' +
                '<input type="text" name="password" />' +
                '<button>Submit</button>' +
                '</form>';

    response.status(200).send((html).toString());
  });

  app.post('/login', function(request, response) {
    console.log(request.body);

    var username = request.body.username;
    var password = request.body.password;

    if(username == 'admin' && password == 'admin') {
      request.session.loggedIn = true;
      return response.redirect('/');
    } else {
      response.status(401).send('Wrong username or password.');
    }
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

  // GET /logout
  app.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });
  
	const PORT = process.env.PORT || 3000;

	app.listen(PORT, function(x, y){

		console.log("server is listening");

	});
