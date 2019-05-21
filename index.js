require("./src/lib/bootstrap")
require("./src/lib/db")
require('./src/lib/cache')
const pEvent = require("p-event")
const createServerAndListen = require("./src/lib/server")
const config = require("config")
const logger = require("./src/lib/logger")
const app = require("./src/lib/app")

async function main() {
  const host = config.get("server.host")
  const port = config.get("server.port")
  const enbaleWs = true
  let server

  try {
    const allServer = await createServerAndListen(app, port, host, enbaleWs)
    server = allServer.server
    if (enbaleWs) require("./src/lib/socket")(allServer.io)
    logger.debug(`Server is listening on: ${host}:${port}`)

    await Promise.race([
      ...["SIGINT", "SIGHUP", "SIGTERM"].map(s =>
        pEvent(process, s, {
          rejectionEvents: ["uncaughtException", "unhandledRejection"],
        }),
      ),
    ])
  } catch (err) {
    process.exitCode = 1
    logger.fatal(err)
  } finally {
    if (server) {
      logger.debug("Close server")
      await server.stop()
      logger.debug("Server closed")
    }

    setTimeout(() => process.exit(), 10000).unref()
  }
}

main()
