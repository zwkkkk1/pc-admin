const qiniu = require('qiniu')
const myError = require('../utils/error')
const config = require('../utils/config')
const upload = require('../utils/upload').single('file')

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
  }
}

