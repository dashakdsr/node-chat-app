let expect = require('expect')
let {generateMessage} = require('./message')

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
