const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const public = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(public));

io.on('connection', (socket) => {
  console.log("New user connected!");
  
  socket.emit('newMessage', {
    from: "User",
    text: "Test message",
    createdAt: 12345
  });
  
  socket.on('createMessage', (message) => {
    console.log(`Created message from ${message.from}: ${message.text}`);
  });
  
  socket.on('disconnect', () => {
    console.log("One user disconnected!");
  });
});

server.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});