const Router = require('koa-router')
const upload = require('./utils/upload')
const User = require('./routes/user')
const Common = require('./routes/common')

const router = new Router()

router.post('/user/register', User.register)
router.post('/user/login', User.login)
router.get('/user/info/token', User.getInfoByToken)
router.get('/user/back/list', User.getBackList)
router.post('/common/upload', upload.single('file'), Common.upload)

module.exports = router