const socket = io();

socket.on('connect', function () {
  console.log("Welcome to the chat!");
});

socket.on('disconnect', function () {
  console.log("You was disconnected!");
});

socket.on('newMessage', function (message) {
  console.log(`New message from ${message.from}: ${message.text}`);
});
