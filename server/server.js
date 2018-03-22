const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { createMessage, createLocation } = require('./utils/message');

const public = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(public));

io.on('connection', (socket) => {
  socket.emit('newMessage', createMessage("Admin", "Welcome to the Chat!"));

  socket.broadcast.emit('newMessage', createMessage("Admin", "New User joined to the room"));

  socket.on('createMessage', (message, callback) => {
    const { from, text } = message;
    io.emit('newMessage', createMessage(from, text));
    if (typeof callback === 'function') {
      callback('Server got the location');
    }
  });

  socket.on('createLocation', (message, callback) => {
    io.emit('newLocation', createLocation('User', message.lat, message.lon));
    if (typeof callback === 'function') {
      callback('Server got the location');
    }
  });

  socket.on('disconnect', () => {
    console.log("One user disconnected!");
  });
});

server.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
