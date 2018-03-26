const nameInput = jQuery('#name-input');
const roomInput = jQuery('#room-input');

const trimNames = function() {
  const nameValue = nameInput.val().trim();
  const roomValue = roomInput.val().trim();
  nameInput.val(nameValue);
  roomInput.val(roomValue);
};

nameInput.on('change', trimNames);
roomInput.on('change', trimNames);
