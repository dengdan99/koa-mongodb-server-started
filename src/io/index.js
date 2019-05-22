const Chatroom = require('./event/chatroom')
const Game = require('./event/game')

const ioEvents = (io) => {
  Chatroom(io)
  Game(io)
}

module.exports = ioEvents
