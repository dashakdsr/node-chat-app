let expect = require('expect')
let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate new message', () => {
    let name = 'Jen'
    let text = 'Hey'
    let message = generateMessage(name, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({
      from: name,
      text
    })
  })
})


describe('generateLocationMessage', () => {
  it('should generate new location message', () => {
    let from = 'Admin'
    let latitude = 1
    let longitude = 2
    let message = generateLocationMessage(from, latitude, longitude)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({
      from,
      url: message
    })
  })
})
