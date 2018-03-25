/***
User schema:
{
  id: Number,
  name: String,
  room: String,
}
***/


class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    user.avatar = 'test.png'; // this is temporary, very soon the avatars handling will be implemented
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
}

module.exports = { Users };
