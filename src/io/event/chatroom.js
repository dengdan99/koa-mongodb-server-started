// Chatroom namespace
module.exports = (io) => {
  const chatroom = io.of('/chatroom')

  // // set middleware
  // chatroom.use((socket, next) => {
  //   console.log(socket.handshake)
  //   next()
  // })

  chatroom.on('connection', (socket) => {
    console.log('connection /chatroom success by socket.id: ' + socket.id)
    socket.emit('msg', 'welcome click join the room')

    
    socket.on('join', (roomName) => {
      joinRoom(socket, 'room1')
    })

    socket.on('leave', (roomName) => {
      joinRoom(socket, 'room1')
    })

    socket.on('chat message', (msg) => {
      sendMsg(socket, msg)
    })

    socket.on('chat get users', (data) => {
      chatroom.adapter.clients(['my room'], (err, clients) => {
        console.log(clients)
      })
      socket.emit('msg', 'xxxxx')
    })
  })


  // 加入房间
  function joinRoom (socket, roomName) {
    chatroom.adapter.remoteJoin(socket.id, roomName, (err) => {
      if (err) throw err
      socket.emit('msg', 'join my room now')
      socket.to(roomName).emit('msg', 'a new user into the room')
      // chatroom.adapter.clients([roomName], (err, clients) => {
      //   if (err) throw err
      //   console.log(clients)
      // })
    })
  }

  // 离开房间
  function joinRoom (socket, roomName) {
    chatroom.adapter.remoteLeave(socket.id, roomName, (err) => {
      if (err) throw err
      socket.to(roomName).emit('msg', 'a new user leave the room')
      chatroom.adapter.clients([roomName], (err, clients) => {
        if (err) throw err
        console.log(clients)
      })
    })
  }

  // 发送消息
  function sendMsg (socket, msg) {

  }

}
