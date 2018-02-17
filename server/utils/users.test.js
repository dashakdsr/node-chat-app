let expect = require('expect')

let {Users} = require('./users')

describe('Users', () => {

  let users
  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Dasha',
      room: 'A'
    },
    {
      id: '2',
      name: 'Andrew',
      room: 'A'
    },
    {
      id: '3',
      name: 'Mike',
      room: 'B'
    }]
  })

  it('should add new user', () => {
    let users = new Users()
    let user = {
      id: '5trggt',
      name: 'Andrew',
      room: 'A'
    }
    let result = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should return list of users for A room', () => {
    let namesArray = users.getUsersList('A')

    expect(namesArray).toEqual(['Dasha', 'Andrew'])
  })

  it('should return list of users for B room', () => {
    let namesArray = users.getUsersList('B')

    expect(namesArray).toEqual(['Mike'])
  })

  it('should remove user', () => {
    let result = users.removeUser('1')

    expect(result.length).toBe(1)
  })

  it('should not remove user', () => {
    let result = users.removeUser('45')

    expect(result).toBe('Id not found')
  })

  it('should find the user', () => {
    let result = users.getUser('1')

    expect(result).toEqual([{
      id: '1',
      name: 'Dasha',
      room: 'A'
    }])
  })

  it ('should not find the user', () => {
    let result = users.getUser('98')

    expect(result.length).toBe(0)
  })
})
