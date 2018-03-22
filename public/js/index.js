const socket = io();

socket.on('connect', function () {
  console.log("Welcome to the chat!");
});

socket.on('disconnect', function () {
  console.log("You was disconnected!");
});

socket.on('newMessage', function (message) {
  const { from, text } = message;
  const timestamp = moment(message.timestamp).format('DD MMM, hh:mm:ss');
  const template = jQuery('#message').html();
  const html = Mustache.render(template, { from, text, timestamp });
  jQuery('#messages').append(html);
});

socket.on('newLocation', function (message) {
  const { from, url } = message;
  const timestamp = moment(message.timestamp).format('DD MMM, hh:mm:ss');
  const template = jQuery('#location').html();
  const html = Mustache.render(template, { from, url, timestamp });
  jQuery('#messages').append(html);
});


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  const messageInput = jQuery('#message-input');
  const from = 'User';
  const text = messageInput.val();

  if (text) {
    socket.emit('createMessage', { from, text }, function (res) {
      if (res) {
        messageInput.val('');
      }
    });
  }
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!(navigator && navigator.geolocation)) {
    return alert("Geolocation is not supported by your browser");
  }
  locationButton.attr('disabled', 'disabled');
  locationButton.text('Sending location...',);
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled');
    locationButton.text('Send location');
    socket.emit('createLocation', {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  }, function () {
    alert('Unable to get your location. Make sure you have permissions enabled.');
  });
});
