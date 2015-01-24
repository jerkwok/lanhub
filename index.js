var express = require('express')();
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');
});
//static connection stuff
var connect = require('connect');
var serveStatic = require('serve-static');
app.use(serveStatic('public'));

app.get('/',function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
	console.log('listening on port 3000');
});