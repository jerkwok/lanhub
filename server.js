var express = require('express')();
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
//static connection stuff
var connect = require('connect');
var serveStatic = require('serve-static');
app.use(serveStatic('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
	console.log('listening on port 3000');
});