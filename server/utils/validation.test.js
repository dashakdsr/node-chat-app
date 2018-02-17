let expect = require('expect')
let {isRealString} = require('./validation')

describe('isRealString', () => {
  it('should reject non-string value', () => {
    let res = isRealString(343534)

    expect(res).toBe(false)
  })

  it('should reject string with onluy spaces', () => {
    let res = isRealString('     ')

    expect(res).toBe(false)
  })

  it('should allow string with non-space characters', () => {
    let res = isRealString('test')

    expect(res).toBe(true)
  })
})
