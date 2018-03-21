const socket = io();

socket.on('connect', function () {
  console.log("Welcome to the chat!");
});

socket.on('disconnect', function () {
  console.log("You was disconnected!");
});

socket.on('newMessage', function (message) {
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  const text = jQuery('#message-input').val();
  const from = 'User';
  if (text) {
    socket.emit('createMessage', { from, text }, function (res) {
      if (res) {
        jQuery('#message-input').val('');
      }
    });
  }
});