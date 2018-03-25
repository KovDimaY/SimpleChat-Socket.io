const expect = require('expect');

const { Users } = require('../users.js');

let users;
const populateUsers = () => {
  users = new Users();
  users.users = [{
    id: 111,
    name: "testName1",
    room: "testRoom1",
    avatar: "male.jpg"
  }, {
    id: 222,
    name: "testName2",
    room: "testRoom2",
    avatar: "female.jpg"
  }, {
    id: 333,
    name: "testName3",
    room: "testRoom1",
    avatar: "admin-1.jpg"
  }];
};

describe('Users class:', () => {
  describe('addUser', () => {
    it('should add new user with avatar', () => {
      const users = new Users();
      const user = {
        id: 123,
        name: "testName",
        room: "testRoom",
        avatar: "male.png"
      };

      users.addUser(user.id, user.name, user.room, user.avatar);

      expect(users.users[0].id).toBe(user.id);
      expect(users.users[0].name).toBe(user.name);
      expect(users.users[0].room).toBe(user.room);
      expect(users.users[0].avatar).toBe('male.png');
    });

    it('should add new user without avatar', () => {
      const users = new Users();
      const user = {
        id: 123,
        name: "testName",
        room: "testRoom"
      };

      users.addUser(user.id, user.name, user.room, user.avatar);

      expect(users.users[0].id).toBe(user.id);
      expect(users.users[0].name).toBe(user.name);
      expect(users.users[0].room).toBe(user.room);
      expect(users.users[0].avatar).toBe('404.png');
    });
  });

  describe('getUser', () => {
    beforeEach(populateUsers);

    it('should return the user by correct id=111', () => {
      const user = users.getUser(111);
      expect(user).toEqual(users.users[0]);
    });

    it('should return the user by correct id=222', () => {
      const user = users.getUser(222);

      expect(user).toEqual(users.users[1]);
    });

    it('should return the user by correct id=333', () => {
      const user = users.getUser(333);

      expect(user).toEqual(users.users[2]);
    });

    it('should return undefined by the incorrect id', () => {
      const user = users.getUser(444);

      expect(user).toBe(undefined);
    });
  });

  describe('removeUser', () => {
    beforeEach(populateUsers);

    it('should remove the user by correct id=111', () => {
      const user = users.removeUser(111);

      expect(user.id).toBe(111);
      expect(users.users.length).toBe(2);
    });

    it('should remove the user by correct id=222', () => {
      const user = users.removeUser(222);

      expect(user.id).toBe(222);
      expect(users.users.length).toBe(2);
    });

    it('should remove the user by correct id=333', () => {
      const user = users.removeUser(333);

      expect(user.id).toBe(333);
      expect(users.users.length).toBe(2);
    });

    it('should return undefined by the incorrect id', () => {
      const user = users.removeUser(444);

      expect(user).toBe(undefined);
      expect(users.users.length).toBe(3);
    });
  });

  describe('getUsernamesList', () => {
    beforeEach(populateUsers);

    it('should return a correct array of names for the first room', () => {
      const names = users.getUsernamesList('testRoom1');

      expect(names).toEqual(['testName1', 'testName3']);
    });

    it('should return a correct array of names for the second room', () => {
      const names = users.getUsernamesList('testRoom2');

      expect(names).toEqual(['testName2']);
    });

    it('should return an empty array of names for the wrong room', () => {
      const names = users.getUsernamesList('ololo');

      expect(names).toEqual([]);
    });
  });
});
