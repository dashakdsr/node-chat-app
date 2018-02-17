let socket = io()

socket.on('connect', () => {
  console.log('connected to server')

})

socket.on('disconnect', () => {
  console.log('disconnected')
})

socket.on('newLocationMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('h:mm a')

  let template = jQuery('#location-message-template').html()
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
  // let li = jQuery('<li></li>')
  // let a = jQuery('<a target="_blank">My current location</a>')
  // li.text(`${message.from} ${formattedTime}: `)
  // a.attr('href', message.url)
  //
  // li.append(a)
})

socket.on('newMessage', (data) => {
  let formattedTime = moment(data.createdAt).format('h:mm a')
  let template = jQuery('#message-template').html()
  let html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()

  let messageTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  })
})

let locationButton = jQuery('#send-location')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location')
  })
})
