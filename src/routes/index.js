const Router = require('koa-router')
const fs = require('fs.promised')
const path = require('path')
const home = require('../controllers/home')
const user = require('../controllers/user')
const proxy = require('../controllers/proxy')

const clientPagePath = '/views/index.html'

var router = new Router({
  // prefix: '/api'
})

// 本地接口
router.use('/api/home', home.routes(), home.allowedMethods())

// 数据固化
router.use('/api/user', user.routes(), user.allowedMethods())

// 代理请求
router.use('/proxy', proxy.routes(), proxy.allowedMethods())

// 页面
router.get('/client', async (ctx) => {
  await ctx.sessionHandler.regenerateId()
  // ctx.session.count = ctx.session.count || 0
  // console.log(ctx.session.count)
  ctx.response.type = 'html'
  ctx.response.body = await fs.readFile(path.join(__dirname, '../', clientPagePath), 'utf8')
})


router.get('/', async (ctx) => {
  ctx.response.body = 'hello world'
})

module.exports = router
