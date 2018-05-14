const _ = require('lodash');

const colors = ["#7cb5ec","#90ed7d","#f7a35c","#8085e9","#f15c80","#e4d354","#2b908f","#f45b5b","#91e8e1"];
const validAvatars = [
  'male0.png',
  'female0.png',
  'male1.png',
  'female1.png',
  'male2.png',
  'female2.png',
  'male3.png',
  'female3.png',
  'male4.png',
  'female4.png'
];

/***
User schema:
{
  id: Number,
  name: String,
  room: String,
  avatar: String,
  color: String
}
***/
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room, avatar) {
    const user = { id, name, room };
    user.avatar = this.saveAvatar(avatar);
    user.color = this.assignColor(colors);
    this.users.push(user);

    return user;
  }

  assignColor(colors) {
    const randIdx = Math.floor(Math.random() * colors.length);
    return colors[randIdx];
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
