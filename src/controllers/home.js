const Router = require('koa-router')
let router = new Router()


router.get('/', async (ctx) => {
  ctx.body = {
    code: 0,
    message: '接口调用成功'
  }
})

router.get('/index', async (ctx) => {
  ctx.body = {
    code: 0,
    message: '接口调用成功2'
  }
})



module.exports = router
