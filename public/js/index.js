let socket = io()

socket.on('connect', () => {
  console.log('connected to server')

})

socket.on('disconnect', () => {
  console.log('disconnected')
})

socket.on('newMessage', (data) => {
  console.log('New message', data)
  let li = jQuery('<li></li>')
  li.text(`${data.from}: ${data.text}`)

  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  })
})
