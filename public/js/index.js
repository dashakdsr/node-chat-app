let socket = io()

function scrollToBottom () {
  let messages = jQuery('#messages')
  let newMessage = messages.children('li:last-child')

  let clientHeight = messages.prop('clientHeight')
  let scrollTop = messages.prop('scrollTop')
  let scrollHeight = messages.prop('scrollHeight')
  let newMessageHeight = newMessage.innerHeight()
  let lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

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
  scrollToBottom()
  jQuery('#messages').append(html)
})

socket.on('newMessage', (data) => {
  let formattedTime = moment(data.createdAt).format('h:mm a')
  let template = jQuery('#message-template').html()
  let html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  })
  scrollToBottom()
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
