const Router = require('koa-router')
const User = require('./routes/user')
const Common = require('./routes/common')
const Product = require('./routes/product')
const Category = require('./routes/category')
const Collect = require('./routes/collect')

const router = new Router()

router
  .post('/user/register', User.register)
  .post('/user/login', User.login)
  .post('/user/:id', User.edit)
  .get('/user/info', User.getInfoByToken)
  .post('/user/info', User.modifyInfo)
  .get('/user/list', User.getList)

router
  .post('/common/upload', Common.upload)
  .post('/common/qiniuToken', Common.getQiniuToken)
  .get('/common/count', Common.getCount)

router
  .post('/product/add', Product.add)
  .get('/product/list', Product.getList)
  .post('/product/:id', Product.edit)
  .delete('/product/:id', Product.del)
  .get('/product/:id', Product.get)

router
  .post('/category', Category.post)
  .delete('/category', Category.delete)
  .get('/category/list', Category.getList)

router
  .get('/collect', Collect.getCollection)
  .post('/collect', Collect.addCollect)
  .delete('/collect', Collect.delCollect)

module.exports = router