const path = require('path')
const express = require('express')
const app = express()

const SocketIO = require('socket.io')

// settings
app.set('port', process.env.PORT || 3000)

// static files
console.log(__dirname + '/public')
app.use(express.static(path.join(__dirname, 'public')))

const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})

// ---------------------------------------------------- //

// SocketIO.listen(server)
const io = SocketIO(server)

// Web Sockets
io.on('connection', socket => {
  console.log('New connection', socket.id)

  socket.on('chat:message', data => {
    io.sockets.emit('chat:message', data)
  })

  socket.on('chat:typing', data => {
    socket.broadcast.emit('chat:typing', data)
  })
})
