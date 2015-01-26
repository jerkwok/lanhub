var socket = io();	

    socket.on('connect', function (){
    	var u = prompt("what's your name?");
    	if(u == null){
    		u = "guest";
    	}
    	while(u.trim().length == 0){
    		var u = prompt("Your name is wrong.");
    		if(u == null){
    		u = "guest";
    		}
    	}
    	if(u == null){
    		u = "guest";
    	}
     	socket.emit('adduser', u);
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

	socket.on('chat message', function(msg){
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
		    		$('#messages').append($('<li>').text(msg));
			}
		}
	scrollToBottom('messagebox');
	});

	socket.on('server message', function(msg){
		$('#messages').append($('<li style="color:#F00">').text(msg));
		scrollToBottom('messagebox');
});