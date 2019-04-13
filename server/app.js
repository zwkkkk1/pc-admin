const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const router = require('./router')
const config = require('./utils/config')
const Jwt = require('./utils/token')
const { port } = require('../utils/config')

const app = new Koa()
const { staticPath } = config

mongoose.connect('mongodb://localhost:27017/mall',{ useNewUrlParser: true }, async (err) => {
  if (err) {
    console.error('connect database error!')
    console.error(err)
    return process.exit(1)
  }

  // 设置 public 为静态资源目录
  app.use(serve(staticPath))

  app.use(bodyParser())

  app.use(async (ctx, next) => {
    let token = ctx.request.headers.authorization;
    if (ctx.request.url !== '/user/login' && ctx.request.url !== '/user/register') {
      let result = new Jwt(token).verifyToken();
      if (result === 'err') {
        ctx.status = 403
        ctx.body = '登录已过期,请重新登录'
      } else {
        await next();
      }
    } else {
      await next()
    }
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(port, console.log(`application is start at port ${port}`))
})