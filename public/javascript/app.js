var socket = io();	
var username;

    socket.on('connect', function (){
    	var u = prompt("what's your name?");
    	if(u == null){
    		u = "guest";
    	}
    	while(u.trim().length == 0 || u.length > 20){
    		var u = prompt("Your name is wrong.");
    		if(u == null){
    		u = "guest";
    		}
    	}
     	socket.emit('adduser', u);
     	username = u;
     	//$('#messages').append($('<li>'.text("usr")));
    });	

 	var userList = [];

    socket.on('update', function (users){
        userList = users;
        $('#user').empty();
        for(var i=0; i<userList.length; i++) {
            $('#user').append("<li>"+userList[i]); 
        }
    });

	$('form').submit(function(){
	    socket.emit('chat message', $('#m').val());
	    $('#m').val('');
    return false;
  	});

	socket.on('chat message', function(msg,username){
		if(msg.trim().length != 0){
		    switch(msg){
		    	case ":kyubey":
			    	$('#messages').append($('<li><img src="http://www.lyninx.com/lanhub/kyubey.png">'));
			    	break;
			    case ":deko":	    
		    		$('#messages').append($('<li><iframe width="560" height="315" src="//www.youtube.com/embed/nmPPCkF6-fk" frameborder="0" allowfullscreen></iframe>'));
		    		break;
			    case ":snout":	    
		    		$('#messages').append($('<li><iframe width="560" height="315" src="//www.youtube.com/embed/-Lmh4vT-bSE?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'));
		    		break;
		    	case ":sugoi":
					$('#messages').append($('<li><img src="http://www.lyninx.com/lanhub/sugoi.gif">'));
		    		break;
		    	case ":baka":
					$('#messages').append($('<li><img src="http://www.lyninx.com/lanhub/baka.gif">'));
		    		break;
		    	case ":gasp":
					$('#messages').append($('<li><img src="http://www.lyninx.com/lanhub/gasp.png">'));
		    		break;
		    	case ":idontgetit":
					//$('#messages').append($(''));
					$('#messages').append($('<li><iframe width="560" height="315" src="//www.youtube.com/embed/2aegP8j5al0?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'));
		    		break;
		    	default: 
		    		$('#messages').append($('<li>').text(username+": "+msg).append($('<div id="timestamp">').text(getTime())));
			}
		}
	scrollToBottom('messagebox');
	});

	socket.on('server message', function(msg){
		$('#messages').append($('<li style="color:#F00">').text(msg).append($('<div id="timestamp">').text(getTime())));
		scrollToBottom('messagebox');
	});

	function getTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var time = hour+':'+minute+':'+second;   
     return time;
}