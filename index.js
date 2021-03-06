require("./src/lib/bootstrap")
require("./src/database")
require('./src/lib/cache')
const pEvent = require("p-event")
const createServerAndListen = require("./src/lib/server")
const config = require("config")
const logger = require("./src/lib/logger")
const app = require("./src/lib/app")

async function main() {
  const host = config.get("server.host")
  const port = config.get("server.port")
  // 是否使用 websocket
  const enbaleWebSocket = true

  try {
    const server = await createServerAndListen(app, port, host, enbaleWebSocket)

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
