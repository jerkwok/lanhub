var app = require('express')();
var http = require('http').Server(app);

app.get('/',function(req,res){
	res.send(__dirname + '/index.html');
});

http.listen(3000, function(){
	console.log('listening on port 3000');
});