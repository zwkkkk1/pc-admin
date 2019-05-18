const qiniu = require('qiniu')
const Jwt = require('../utils/token')
const myError = require('../utils/error')
const config = require('../utils/config')
const upload = require('../utils/upload').single('file')
const UserModel = require('../models/user')
const ProductModel = require('../models/product')

module.exports = {
  upload: async (ctx, next) => {
    await upload(ctx, next)
    const { path, originalname } = ctx.req.file
    const filePath = path.replace(config.staticPath, '')
    ctx.body = { path: filePath, originalname }
    ctx.status = 200
  },
  getQiniuToken: async (ctx) => {
    const { accessKey, secretKey, bucket } = config.qiniuConfig
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const options = {
      scope: bucket,
      expires: 60 * 60 * 24
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    if (uploadToken) {
      ctx.body = uploadToken
    } else {
      throw new myError(503, '七牛Token获取失败')
    }
  },
  getCount: async (ctx) => {
    const token = ctx.request.headers.authorization
    const { level } = new Jwt(token).verifyToken()
    const result = {}
    result.product = await ProductModel.getCount()
    if (level > 1) {
      result.frontUser = await UserModel.getCount({ type: 'front' })
    }
    if (level > 2) {
      result.backUser = await UserModel.getCount({ type: 'back' })
    }
    ctx.body = result
  }
}

