var express = require('express')();
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
//static connection stuff
var connect = require('connect');
var serveStatic = require('serve-static');
app.use(serveStatic('public'));

var users = [];
var username;

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('adduser', function (user) {
    socket.user = user;
    users.push(user);
    username = user;
    updateClients();
    io.emit('server message', user +" has joined the chat.");
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');

      for(var i=0; i<users.length; i++) {
        if(users[i] == socket.user) {
          //delete users[i]; //doesnt work lol
          //delete users[socket.user];
          console.log(users[i] + " has left.");
          io.emit('server message', users[i] + " has left the chat");
          users.splice(i,1);
        }
      }
    updateClients(); 
  });

  function updateClients() {
    io.sockets.emit('update', users);
    console.log("users online:");
    for(var i=0; i<users.length; i++) {
      console.log(users[i]);
    }
  }
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg,username);
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

