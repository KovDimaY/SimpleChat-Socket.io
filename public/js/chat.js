const socket = io();

function scrollToBottom() {
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();
  if (clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      swal("Error", err, "error").then(function() {
        window.location.href = '/';
      });
    } else {

    }
  });
});

socket.on('disconnect', function() {});

socket.on('updateUserList', function(users) {
  var ul = jQuery('<ul></ul>');
  users.forEach(function(user) {
    ul.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ul);
});

socket.on('newMessage', function(message) {
  const { from, text } = message;
  let avatar = message.avatar;
  if (from === 'Admin') avatar = 'admin-1.png';
  const timestamp = moment(message.timestamp).format('DD MMM, hh:mm:ss');
  const template = jQuery('#message').html();
  const html = Mustache.render(template, { from, avatar, text, timestamp });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocation', function(message) {
  const { from, url, avatar } = message;
  const timestamp = moment(message.timestamp).format('DD MMM, hh:mm:ss');
  const template = jQuery('#location').html();
  const html = Mustache.render(template, { from, avatar, url, timestamp });
  jQuery('#messages').append(html);
  scrollToBottom();
});


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  const messageInput = jQuery('#message-input');
  const from = 'User';
  const text = messageInput.val();

  if (text && text.trim().length > 0) {
    socket.emit('createMessage', { from, text }, function(res) {
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
  }, function() {
    alert('Unable to get your location. Make sure you have permissions enabled.');
  });
});
