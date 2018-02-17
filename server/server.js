const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express')

const publicPath = path.join(__dirname, '../public')
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

let port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)
let users = new Users()

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('NEw user connected')

  socket.on('createMessage', (data, callback) => {
    let user = users.getUser(socket.id)
    if (user && isRealString(data.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, data.text))
    }

    callback()
  })

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required')
    }

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', users.getUsersList(params.room))

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'))

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id)
    if (user) {
      io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
    // io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    let result = users.removeUser(socket.id)

    if (result) {
      io.to(result.room).emit('updateUserList', users.getUsersList(result.room))
      io.to(result.room).emit('newMessage', generateMessage('Admin', `${result.name} has left`))
    }
  })
})

server.listen(port, () => {
  console.log('Started on port ', port)
})

module.exports = {
  app
}
