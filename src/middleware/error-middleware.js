const errors = require("../lib/errors")
const _ = require("lodash")
const logger = require("../lib/logger")

module.exports = async (ctx, next) => {
  try {
    await next()
    ctx.assert(ctx.response.body && Number(ctx.response.status) !== 404, 404)
  } catch (err) {
    ctx.type = "application/json"

    const status =
      err.status ||
      err.statusCode ||
      err.status_code ||
      (err.output && err.output.statusCode) ||
      (err.oauthError && err.oauthError.statusCode) ||
      500

    if (!ctx.response.body) {
      ctx.response.body = { errors: {} }
    }
    // ctx.app.emit('error', err, ctx)
    // console.error(err.status)
    logger.fatal(err)

    switch (true) {
      // 处理接口错误
      case !!(err.response && err.response.config) && err.response.status !== 200: {
        const log = 'api error '+ err.response.status +': ' + err.response.config.url
        // console.log(err)
        logger.fatal(log)
        ctx.body.errors = log
        ctx.status = _.defaultTo(status, 500)
      }

      default:
        ctx.status = _.defaultTo(status, 500)
        break
    }
  }
}
