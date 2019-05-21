const http = require("http")
const stoppable = require("stoppable")
const pEvent = require("p-event")
const util = require("util")

module.exports = async function createServerAndListen(app, port, host, enableWebsocket) {
  const appServer = http.createServer(app.callback())
  const server = stoppable(appServer, 7000)
  let io

  if (enableWebsocket) io = require('socket.io')(appServer)

  server.listen(port, host)

  server.stop = util.promisify(server.stop)

  await pEvent(server, "listening")

  return {
    server,
    io
  }
}
