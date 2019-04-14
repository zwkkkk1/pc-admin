const Jwt = require('../utils/token')
const myError = require('../utils/error')

module.exports = async (ctx, next) => {
  let token = ctx.request.headers.authorization;
  if (ctx.request.url !== '/user/login' && ctx.request.url !== '/user/register') {
    let result = new Jwt(token).verifyToken();
    if (result === 'err') {
      throw new myError(403, '登录已过期,请重新登录')
    } else {
      await next();
    }
  } else {
    await next()
  }
}