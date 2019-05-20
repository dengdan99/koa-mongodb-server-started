const userService = require('../service/user-service')
const xss = require('xss')
const uuid = require('uuid')
const mongoose =  require('mongoose')
const User = mongoose.model('User')
const Router = require('koa-router')

let router = new Router()

router.get('/index', async (ctx) => {
  const query = ctx.request.query
  const users = await userService.findAllUsers(query)

  ctx.body = {
    success: true,
    data: users
  }
})

router.post('/delete', async (ctx) => {
  const phoneNumber = xss(ctx.request.body.phoneNumber.trim())
  const res = await userService.deleteUser({phoneNumber})

  ctx.body = {
    success: !!res,
    data: {}
  }
})

router.post('/add', async (ctx) => {
  const phoneNumber = xss(ctx.request.body.phoneNumber.trim())
  const nickname = xss(ctx.request.body.nickname.trim())
  const verifyCode = Math.floor(Math.random()*10000+1)

  const _user = await userService.findByPhoneNumber({phoneNumber})
  if (_user) {
    ctx.body = {
      success: false,
      data: 'this user exist!!'
    }
    return
  }

  const user = new User({
    nickname: nickname,
    avatar: 'http://img.i.cacf.cn/avatar/1905/14/8843e0c9a344e08df640c3e2f118df1f_s574x384.jpg!100100',
    phoneNumber: phoneNumber,
    verifyCode: verifyCode,
    accessTonken: uuid.v4()
  })

  const newUser = await userService.addUser(user)
  if (newUser) {
    ctx.body = {
      success: true,
      data: newUser
    }
  }
})




module.exports = router
