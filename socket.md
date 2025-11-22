## Server Side
```
const express = require("express");
const app = express();
const {createServer} = require("node:http")
const {Server} = require("socket.io");


// http.createServer()
const httpServer =  createServer(app)

const io = new Server(httpServer, {...configurations});
io.on("connection", (socket)=>{ // connection : in build method
	// listening to the event:clientEvent emited from the front end
	socket.on("clientEvent", (data,callback)=>{
		callback("response to client"); // the callback is used to send some data back to the emitter for the given eventName:clientEvent
		
	});
	
	// emiting an event from the server
	socket.emit('serverEvent', someData, (clientResponse)=>{
		// handle the data returned back from client
	})
})

```

from the above context, the server can emit and listen to an event.


## Client side code:
```
socket.on("serverEvent", (data,callback)=>{
	// handle the data from the server
	callback("send some data for the given event")
});

socket.emit("clientEvent", data, (serverResponse)=>{
	//handle server response
})
```
from the above we can emit and listen events in the client

My observations:
when emitting an event in either side(client/server)
the emit takes 3 arguments
- eventName
- data2Send
- callbackFunction with 1 argument: this argument is what is send by the listener as described below
```
socket.emit('eventName', data2Send, (responseFromListener)=>{})
```

For the listener on either side:
- eventName
- callback function with 2 arguments: data, callback
	- the data is what is sent from the emitter: data2Send
	- callback: function that sends back somedata
	
	
With this i can move on:
