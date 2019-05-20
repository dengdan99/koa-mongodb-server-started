const Router = require('koa-router')
const axios = require('../lib/request')
let router = new Router()


router.get('/index', async (ctx) => {
  const result = await axios.get('/feed/square/filter2')
  ctx.body = {
    code: 0,
    message: result.data
  }
})

router.get('/index2', async (ctx) => {
  ctx.body = {
    code: 0,
    message: '接口调用成功2'
  }
})



module.exports = router
