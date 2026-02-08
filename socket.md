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
i
``io.emit()``:Broadcast to all users including the sender:status online

``io.to(room).emit()``:  Send to all clients in a specific room/group


Room
a room is a server side chanell that client can join. One can then send messages using this specific room without broadcasting to everyone.[targeted_communication]


# Socket 
```js
// server-side
io.on("connection", (socket) => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

// client-side
socket.on("connect", () => {
	console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});
```

**Using Rooms**
User click on chat message for him/her (between users on chat sidebar):
- launch:
```js
	socket.emit('join_chat',{roomId, userId})
```
The roomId can be created from a mixture of both the user A and user B (slice(0,5) + slice(0,5))
backend:   
```js
	socket.on('join_chat', ({roomId, userId})=>{
	socket.join(roomId);
	socket.to(roomId).emit('user_joined', {userId})
})
```

- Send Messages
```js
	socket.emit("sendMessage", {message,roomId})
```

backend:  
```js
socket.on('sendMessage', ({roomId, messagge})=>{
    // using the room id we save the message to the database
})
```


Question: i have the following on server:
```
const io = new Server(httpServer, {
    cors: [...],
    methods: [..]
})
```
my thoughts: when the server starts this is run (why: because the code is setup in server.js file and scripts are: node server.js || nodemon server.js)


Within the same file i have:
```
io.on('connection', (socket)=>{
    socket.on('eventName', (dataReceived)=>{
        //..perform sth
    })
})
```

does the above get run when i do : nodemon server.js or for on production to : node server.js

Approach A: Emit login event via HTTP and then use Socket.IO to broadcast the status change.
    * When the user logs in (HTTP), we can emit a socket event to update the status.
    * But the socket connection might not be established at the exact moment of HTTP login.

Approach B: Use Socket.IO connection event to set the user as online.
    * When the socket connects, we have the user information (from the authentication of the socket).
    * Then we can set the user as online and notify others.

On this approach B will it depend on the startup code mentioned above (does ``io.on('connect')`` get run when the file is executed)

When the user logs in (HTTP), we don't emit the online status. Instead, we wait for the socket connection.: Does this mean when we setup an event on the frontend: after login success we emit event to the backend: (my thoughts: seems a bit odd: why you may ask? Because if a setup an emit event on the frontend i have to add a listener to the backend and then again emit an event to all users:) Instead i could just use the login controller on my backend after a student or psychiatrist is logged in the event emmited: (note: there are 2 auth files for the student and psychiatrist: each one handling the given user: one for student and the other for psychiatrist)




So  i think just moving with a basic approach to see how it works for the time being that is:
```
app.set('io', io)
```
Then in the loginAuth controller emit the event (Question: since am already setting up  io on the server.js file does this mean it's always available)

I have seen the issue with this logic:
How is it i add a value to io for a only a given user for his/her online status to be updated

e.g 
io.emit(onlineStatus) ; // this goes to every body : but how do i set it that only the userA online status is displayed


Do not write any code this is more of a brainstorming session

Why you may wonder: i want to break up this login untill i understand it

