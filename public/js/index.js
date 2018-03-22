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

socket.on('newLocation', function (message) {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');

  a.attr('href', message.url);
  li.text(`${message.from}: `);
  li.append(a);
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

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!(navigator && navigator.geolocation)) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocation', {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  }, function () {
    alert('Unable to get your location. Make sure you have permissions enabled.');
  });
});
