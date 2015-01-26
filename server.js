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
  io.emit('server message', 'someone has joined the chat');
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('server message', 'someone has left the chat');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    //scrollToBottom('messagebox');
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

http.listen(3001, function(){
	console.log('listening on port 3001');
});

