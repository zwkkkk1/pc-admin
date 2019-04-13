const config = require('../utils/config')
module.exports = {
  upload: async ctx => {
    const { path, originalname } = ctx.req.file
    const filePath = path.replace(config.staticPath, '')
    ctx.body = { path: filePath, originalname }
    ctx.status = 200
  }
}

