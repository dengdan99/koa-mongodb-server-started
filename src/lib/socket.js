const redisAdapter = require('socket.io-redis')
const config = require('config')
const ioEvents = require('../io')

const init = (server) => {
  const io = require('socket.io')(server, {
    path: '/socket.io',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  })

  // 强制使用websocket, 不使用长轮询的方式, 客户端要做相应的配置
  // io.set('transports', ['websocket'])

  const port = config.get('cache.port')
  const host = config.get('cache.host')
  // const pubClient = redis(port, host)
  // const subClient = redis(port, host)

  // 发布/订阅 可以分开配置不同的redis
  // io.adapter(redisAdapter({ pubClient, subClient }))
  io.adapter(redisAdapter({ host: host, port: port }))

  ioEvents(io)

  return io
}

module.exports = init
