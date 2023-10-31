const { PORT, OPTS } = require('./config.js')
const app = require('express')()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, OPTS)

io.on('connection', (data) => io.emit('connection', data))

io.on('message', (data) => io.emit('message', data))

server.listen(PORT)
