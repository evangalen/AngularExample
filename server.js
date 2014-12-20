var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// dummy database
var tasks = [
  {
    id: 0,
    name: 'Ne',
    description: 'Unclock',
    input: '%3Cform%20class=%22navbar-form%20navbar-left%22%20role=%22search%22%3E%0A%20%20%3Cdiv%20class=%22form-group%22%3E%0A%20%20%20%20%3Cinput%20type=%22text%22%20class=%22form-control%22%20placeholder=%22Search%22%3E%0A%20%20%3C/div%3E%0A%20%20%3Cbutton%20type=%22submit%22%20class=%22btn%20btn-default%22%3ESubmit%3C/button%3E%0A%3C/form%3E',
    behaviour: 'var%20parse%20=%20this.parseInt;%0Avar%20a%20=%20parse(params.a,%2010);%0Avar%20b%20=%20parse(params.b,%2010);%0Acallback.call(context,%20a%20+%20b);',
    output: '%3Cdiv%20class=%22row%22%20ng-show=%22resultDone%22%3E%0A%20%20%20%20%3Ch3%3EResult%20is%20%7B%7Bresult.value%7D%7D%3C/h3%3E%0A%3C/div%3E'
  },
  {
    id: 1,
    name: 'Unclock',
    description: 'Unclock',
    input: '%3Cdiv%20class=%22row%22%3E%0A%20%20%20%20%3Cdiv%20class=%22form-group%22%3E%0A%20%20%20%20%20%20%20%20%3Clabel%20for=%22a%22%3Ea%3C/label%3E%0A%20%20%20%20%20%20%20%20%3Cinput%20id=%22a%22%20ng-model=%22a%22%20class=%22form-control%22%3E%0A%20%20%20%20%3C/div%3E%0A%20%20%20%20%3Cdiv%20class=%22form-group%22%3E%0A%20%20%20%20%20%20%20%20%3Clabel%20for=%22b%22%3Eb%3C/label%3E%0A%20%20%20%20%20%20%20%20%3Cinput%20id=%22b%22%20ng-model=%22b%22%20class=%22form-control%22%3E%0A%20%20%20%20%3C/div%3E%0A%3C/div%3E',
    behaviour: 'var%20parse%20=%20this.parseInt;%0Avar%20a%20=%20parse(params.a,%2010);%0Avar%20b%20=%20parse(params.b,%2010);%0Acallback.call(context,%20a%20+%20b);',
    output: '%3Cdiv%20class=%22row%22%20ng-show=%22resultDone%22%3E%0A%20%20%20%20%3Ch3%3EResult%20is%20%7B%7Bresult.value%7D%7D%3C/h3%3E%0A%3C/div%3E'
  },
  {
    id: 2,
    name: 'Clock',
    description: 'Unclock',
    input: '%3Cdiv%20class=%22row%22%3E%0A%20%20%20%20%3Cdiv%20class=%22form-group%22%3E%0A%20%20%20%20%20%20%20%20%3Clabel%20for=%22a%22%3Ea%3C/label%3E%0A%20%20%20%20%20%20%20%20%3Cinput%20id=%22a%22%20ng-model=%22a%22%20class=%22form-control%22%3E%0A%20%20%20%20%3C/div%3E%0A%20%20%20%20%3Cdiv%20class=%22form-group%22%3E%0A%20%20%20%20%20%20%20%20%3Clabel%20for=%22b%22%3Eb%3C/label%3E%0A%20%20%20%20%20%20%20%20%3Cinput%20id=%22b%22%20ng-model=%22b%22%20class=%22form-control%22%3E%0A%20%20%20%20%3C/div%3E%0A%3C/div%3E',
    behaviour: 'var%20parse%20=%20this.parseInt;%0Avar%20a%20=%20parse(params.a,%2010);%0Avar%20b%20=%20parse(params.b,%2010);%0Acallback.call(context,%20a%20+%20b);',
    output: '%3Cdiv%20class=%22row%22%20ng-show=%22resultDone%22%3E%0A%20%20%20%20%3Ch3%3EResult%20is%20%7B%7Bresult.value%7D%7D%3C/h3%3E%0A%3C/div%3E'
  }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/'));

app.get('/api/tasks', function (req, res) {
  res.json(tasks);
});

app.get('/api/tasks/:id', function (req, res) {
  res.json(tasks[req.params.id]);
});

app.delete('/api/tasks/:id', function (req, res) {
  if (tasks[req.params.id] == undefined) {
    res.statusCode = 404;
    return res.send('Task ' + req.params.id + ' not found');
  }

  var data = [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id != req.params.id) {
      data.push(tasks[i]);
    }
  }

  console.log(data)
//  delete tasks[req.params.id];
//  res.json(data);
});

app.post('/api/tasks', function (req, res) {
  if (!req.body.hasOwnProperty('name')) {
    res.statusCode = 400;
    return res.send('Error 400: Invalid data.');
  }

  var id = tasks.length;
  tasks[id] = {
    'name': req.body.name,
    'description': req.body.description,
    'behaviour': req.body.behaviour,
    'output': req.body.output,
    'input': req.body.input,
    'status': 0,
    'id': id
  };
  res.json(tasks[id]);
});


//Auth

var currentUser = {};
var users = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    mode: 'Administrator'
  },
  {
    id: 1,
    username: 'chungho',
    password: 'chungho',
    mode: 'User'
  }
];

app.get('api/auth/forget', function (req, res) {
  res.clearCookie('remember');
  res.redirect('back');
});

app.get('/api/auth/admin', function (req, res) {
  res.send(true);
});

app.post('/api/auth/login', function (req, res) {

  var result = false;
  var minute = 60 * 1000;

  if (!req.body.hasOwnProperty('username')) {
    res.statusCode = 400;
    return res.send('Error 400: Invalid data.');
  }

  for (var i = 0; i < users.length; i++) {
    if (req.body.username === users[i].username && req.body.password === users[i].password) {
      currentUser = users[i];
      result = true;
      break;
    }
  }

//    if (req.body.remember) res.cookie('remember', users[i].id, { maxAge: minute });
//    res.clearCookie('name', { path: '/admin' });
  res.cookie('username', req.body.username);
  res.send(result);

});

app.get('/api/auth/logout', function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function () {
    res.redirect('/');
  });
});

app.get('/api/auth/current-user', function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  res.json(currentUser);
});

//app.get('/', function(req, res){
//  res.redirect('login');
//});

app.all('/*', function (req, res) {
  res.redirect('src/login.html');
});

app.listen(port);
console.log("Angular App Server listening at http://localhost:" + port);