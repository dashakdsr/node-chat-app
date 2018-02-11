const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express')

const publicPath = path.join(__dirname, '../public')

let port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('NEw user connected')

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })
  // socket.emit('newMessage', {
  //   from: 'mike@example.com',
  //   text: 'Hey',
  //   createdAt: 123
  // })

  socket.on('createMessage', (data) => {
    console.log('createMessage', data)

    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime()
    })
    //
    // socket.broadcast.emit('newMessage', {
    //   from: data.from,
    //   text: data.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log('disconnected user')
  })
})

server.listen(port, () => {
  console.log('Started on port ', port)
})

module.exports = {
  app
}
