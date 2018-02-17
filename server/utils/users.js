[{
  id: '/f43g4ber',
  name: 'Andrew',
  room: 'The Office fans'
}]

class Users {
  constructor () {
    this.users = []
  }

  addUser (id, name, room) {
    let user = {id, name, room}
    this.users.push(user)
    return user
  }

  removeUser (id) {
    let index = this.users.findIndex((user) => user.id === id)
    let user = this.users.filter((user) => user.id !== id)
    if (index >= 0) {
      this.users.splice(index, 1)
      return user
    } else {
      return 'Id not found'
    }
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)
  }

  getUsersList (room) {
    let users = this.users.filter((user) => user.room === room)
    let namesArray = users.map((user) => user.name)
    return namesArray
  }
}

module.exports = {Users}
