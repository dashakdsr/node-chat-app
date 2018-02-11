let socket = io()

socket.on('connect', () => {
  console.log('connected to server')

  socket.emit('createMessage', {
    to: 'hen@example.com',
    text: 'Hey'
  })
})

socket.on('disconnect', () => {
  console.log('disconnected')
})

socket.on('newMessage', (data) => {
  console.log('New message', data)
})

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data) {
  console.log('Got it', data)
})
