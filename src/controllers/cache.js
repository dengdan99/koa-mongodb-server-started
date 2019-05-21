const Router = require('koa-router')
const cache = require('../lib/cache')

let router = new Router()


router.get('/set', async (ctx) => {
  const key = ctx.request.query.key
  const value = ctx.request.query.value
  await cache.set(key, value)
  ctx.body = {
    code: 0,
    message: 'set successfull'
  }
})

router.get('/get', async (ctx) => {
  const key = ctx.request.query.key
  const value = await cache.getAsync(key)
  if (value === null) {
    ctx.body = {
      code: 1,
      message: 'the key is not exist',
    }
    return
  }
  ctx.body = {
    code: 0,
    message: 'get successfull',
    data: value
  }
  
})



module.exports = router
