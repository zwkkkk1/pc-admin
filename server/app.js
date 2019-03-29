const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const router = require('./router')

const app = new Koa()

mongoose.connect('mongodb://localhost:27017/mall',{ useNewUrlParser: true }, async (err) => {
  if (err) {
    console.error('connect database error!')
    console.error(err)
    return proces.exit(1)
  }

  app.use(bodyParser())
  app
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(3000, console.log('application is start at port 3000'))
})