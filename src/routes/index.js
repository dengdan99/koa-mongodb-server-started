const Router = require('koa-router')
const fs = require('fs.promised')
const path = require('path')
const home = require('../controllers/home')
const user = require('../controllers/user')

const clientPagePath = '/dist/client/index.html'

var router = new Router({
  // prefix: '/api'
})

// 接口
router.use('/api/home', home.routes(), home.allowedMethods())
router.use('/api/user', user.routes(), user.allowedMethods())

// 页面
router.get('/client', async (ctx) => {
  ctx.response.type = 'html'
  ctx.response.body = await await fs.readFile(path.resolve('../', clientPagePath), 'utf8')
})

module.exports = router
