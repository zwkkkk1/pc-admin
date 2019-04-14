const Router = require('koa-router')
const User = require('./routes/user')
const Common = require('./routes/common')
const Product = require('./routes/product')

const router = new Router()

router.post('/user/register', User.register)
router.post('/user/login', User.login)
router.get('/user/info/token', User.getInfoByToken)
router.get('/user/back/list', User.getBackList)
router.post('/common/upload', Common.upload)
router.post('/product/add', Product.add)

module.exports = router