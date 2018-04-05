const _ = require('lodash');

const validAvatars = [
  'male.png',
  'female.png'
];


/***
User schema:
{
  id: Number,
  name: String,
  room: String,
  avatar: String
}
***/
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room, avatar) {
    const user = { id, name, room };
    user.avatar = this.saveAvatar(avatar);
    this.users.push(user);

    return user;
  }

  getUser(id) {
    const user = this.users.filter(user => user.id === id);
    return user[0];
  }

  removeUser(id) {
    const user = this.getUser(id);
    if (user) this.users = this.users.filter(user => user.id !== id);
    return user;
  }

  getUsernamesList(room) {
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => user.name);
    return namesArray;
  }

  saveAvatar(avatar) {
    if (_.includes(validAvatars, avatar)) {
      return avatar;
    }
    return '404.png';
  }

  isUniqueName(name, room) {
    const existingNames = this.getUsernamesList(room);

    return !_.includes(existingNames, name);
  }
}

module.exports = { Users };
