const nameInput = jQuery('#name-input');
const roomInput = jQuery('#room-input');

const trimNames = function() {
  const nameValue = nameInput.val().trim();
  const roomValue = roomInput.val().trim();
  nameInput.val(nameValue);
  roomInput.val(roomValue);
};

const selectAvatar = function(element) {
  console.log(element)
  const avatarPicture = jQuery(element);
  const allAvatars = jQuery(".avatar-selection");
  for (let i = 0; i < allAvatars.length; i += 1) {
    jQuery(allAvatars[i]).removeClass("avatar-active");
  }
  avatarPicture.addClass("avatar-active");
  avatarPicture.find('input').prop("checked", true);
};

nameInput.on('change', trimNames);
roomInput.on('change', trimNames);
