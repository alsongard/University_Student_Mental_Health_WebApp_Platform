## Server Side
```js
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
```js
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


Then, when a new message is stored, the server emits the message to the room (io.to(roomId).emit("newMessage", newMessage)).



This way, both the sender and the receiver (if they are in the room) will get the message.
But note: The sender is in the room, so they will get the message again. So, we need to handle it on the client.
Alternatively, we can emit the message only to the receiver (so the sender doesn't get it again) and then the sender updates the message via the HTTP response.
But then, if the sender has multiple devices, they might not get the message on the other device if we don't broadcast to the room.


Given the complexity, let me list the methods:
    socket.emit(event, data): Sends an event to the current client (the one that sent the message to the server) only.
    socket.broadcast.emit(event, data): Sends an event to all other connected clients except the sender.
    io.emit(event, data): Sends an event to all connected clients.
    io.to(roomId).emit(event, data): Sends an event to all clients in the room.



**Rooms scallability**
If we are not using rooms, then we can do:
    For the sender: we can use the HTTP response to update the message (or use socket.emit for the sender).
    For the receiver: we can use socket.broadcast.emit to send the message to everyone except the sender.
But if we are using rooms (which is more scalable for group chats and easy to manage), then we can do:
    When a user sends a message, the server stores it and then emits the message to the room (which includes the sender and the receiver). Then, on the client, we handle the event and update the state


**Option 2 (Optimistic update with rooms):**
    Sender sends message (HTTP POST) and optimistically updates the state with a temporary message.
    Server stores the message and then emits the message to the room (including the sender and the receiver).
    When the sender receives the message via socket, they replace the temporary message with the real one (by matching the temporary ID or by some other means).
    The receiver adds the message to their state.



``socket.emit()``: this is used to emit an event to a specific user

``socket.broadcast.emit()``: To everyone except the sender: implementation: on user logged in send this to others:

``io.emit()``:Broadcast to all users including the sender:status online

``io.to(room).emit()``:  Send to all clients in a specific room/group