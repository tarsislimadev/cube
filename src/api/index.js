const { PORT, OPTS } = require('./config.js')
const app = require('express')()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, OPTS)

io.on('message', (data) => {
  console.log('message', data)

  io.emit('message', data)
})

io.listen(PORT)
