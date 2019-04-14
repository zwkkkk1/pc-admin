const myError = require('../utils/error')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    if (err instanceof myError) {
      ctx.status = err.status
      ctx.body = err.message
    } else {
      ctx.status = 500
      ctx.body = err.message || '服务异常'
    }
  }
}