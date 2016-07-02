var express = require('express');
var bodyParser=require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');
var server = express();


var port = process.env.PORT || 8080;
var db = lowdb('db.json');

//Database initialization
db.defaults({todos: []})
.value();   //runs the previous set of commands


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/todos', function(request, response){
var result= db.get('todos')
  .value()
  response.send(result);
});

server.get('/todos/:id', function(request, response){
  response.send('GET todos :id');
});

server.put('/todos/:id', function(request, response){
  response.send('PUT todos :id');
});

server.delete('/todos/:id', function(request, response){
  response.send('DELETE todos :id');
});

server.post('/todos', function(request, response){
  var todo = {
    id: uuid.v4(),
    description: request.body.description,
    isComplete: false
  };

  var result= db.get('todos')
                .push(todo)
                .last()
                .value();
  response.send(result);
});

server.listen(port, function (){
  console.log('Now listening on port ...' +port);
});
