const config = require('../utils/config')
const upload = require('../utils/upload').single('file')

module.exports = {
  upload: async (ctx, next) => {
    await upload(ctx, next)
    const { path, originalname } = ctx.req.file
    const filePath = path.replace(config.staticPath, '')
    ctx.body = { path: filePath, originalname }
    ctx.status = 200
  }
}

