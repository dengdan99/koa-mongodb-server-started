const config = require("config")
const Koa = require("koa")

const app = new Koa()

app.proxy = true

app.keys = [config.get("secret")]

const responseTime = require("koa-response-time")
const helmet = require("koa-helmet")
const logger = require("koa-logger")
const xRequestId = require("koa-x-request-id")
const error = require("../middleware/error-middleware")
const cors = require("kcors")
const bodyParser = require("koa-bodyparser")
const routes = require("../routes")

app.use(responseTime())
app.use(xRequestId({ inject: true }, app))
app.use(logger())
app.use(helmet())
app.use(
  cors({
    origin: "*",
    exposeHeaders: ["Authorization"],
    credentials: true,
    allowMethods: ["GET", "PUT", "POST", "DELETE"],
    allowHeaders: ["Authorization", "Content-Type"],
    keepHeadersOnError: true,
  }),
)

app.use(error)
// app.use(jwt)
app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
  }),
)

app.use(routes.routes())
app.use(routes.allowedMethods())

module.exports = app
