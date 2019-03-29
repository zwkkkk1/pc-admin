const Router = require('koa-router')
const User = require('./controller/user')

const router = new Router()

router.post('/user/register', User.register)
router.post('/user/login', User.login)

module.exports = router