const redisAdapter = require('socket.io-redis')
const config = require('config')
const logger = require('../lib/logger')

module.exports = (io) => {
  const adapter = redisAdapter({ host: config.get('cache.host'), port: config.get('cache.port') })
  io.adapter(adapter)

  adapter.pubClient.on('error', function(err) {
    logger.fatal('pubClinet error: ' + err)
  })
  adapter.subClient.on('error', function(err) {
    logger.fatal('subClient error: ' + err)
  })

  io.of('/app').adapter.on('connection', (socket) => {
    io.emit('chat message', 'hello')

    socket.on('chat message', (msg) => {
      console.log('message: '+msg)
      io.emit('chat message', msg)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
