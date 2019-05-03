const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const router = require('./router')
const config = require('./utils/config')
const { port } = require('../utils/config')
const { accessLogger } = require('./utils/logger')
const errorMiddleware = require('./middleware/error')
const tokenMiddleware = require('./middleware/token')

const app = new Koa()
const { staticPath } = config

mongoose.connect('mongodb://localhost:27017/mall',{ useNewUrlParser: true }, async (err) => {
  if (err) {
    console.error('connect database error!')
    console.error(err)
    return process.exit(1)
  }

  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
  })

  // 设置 public 为静态资源目录
  app.use(serve(staticPath))

  app.use(accessLogger())

  app.use(bodyParser())

  app.use(errorMiddleware)

  app.use(tokenMiddleware)

  app
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(port, console.log(`application is start at port ${port}`))
})