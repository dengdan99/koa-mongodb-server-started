// Chatroom namespace
module.exports = (io) => {
  const game = io.of('/game')
  
  game.on('connection', (socket) => {
    console.log('connection /game success by socket.id: ' + socket.id)

    // some code ...
  })
}
