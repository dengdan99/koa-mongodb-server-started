const Router = require('koa-router')
const fs = require('fs.promised')
const path = require('path')
const home = require('../controllers/home')
const user = require('../controllers/user')
const proxy = require('../controllers/proxy')
const cache = require('../controllers/cache')

const clientPagePath = '/views/client.html'

var router = new Router({
  // prefix: '/api'
})

// 本地接口测试
router.use('/api/home', home.routes(), home.allowedMethods())

// 数据固化测试
router.use('/api/user', user.routes(), user.allowedMethods())

// 代理请求测试
router.use('/api/proxy', proxy.routes(), proxy.allowedMethods())

// 缓存操作测试
router.use('/api/cache', cache.routes(), cache.allowedMethods())


// 页面
router.get('/client', async (ctx) => {
  ctx.response.type = 'html'
  ctx.response.body = await fs.readFile(path.join(__dirname, '../', clientPagePath), 'utf8')
})


router.get('/', async (ctx) => {
  ctx.response.body = 'hello world'
})

module.exports = router
