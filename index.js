const express = require('express');
const app = express();
const http = require('http');
// const { Socket } = require('socket.io');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server (server);

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket)=>{
    socket.on('chat message', (msg) =>{
        console.log("message: " + msg);
    });
    // console.log("a user is connected");
    // socket.on('disconnect', ()=>{
    //     console.log("a user has been disconnected")
    // })
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
io.on('connection', (socket)=>{
    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg);
    })
})
server.listen(3100, ()=>{
    console.log("Chat app is listening on port 3000")
})