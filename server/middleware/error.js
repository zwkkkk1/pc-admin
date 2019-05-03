const myError = require('../utils/error')
const { logger } = require('../utils/logger')


module.exports = async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    logger.error(err)
    if (err instanceof myError) {
      ctx.status = err.status
      ctx.body = err.message
    } else {
      ctx.status = 500
      ctx.body = err.message || '服务异常'
    }
  }
}