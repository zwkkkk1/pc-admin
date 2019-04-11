const Jwt = require('../utils/token')
const UserModal = require('../model/user')

module.exports = {
  register: async (ctx) => {
    let content = ctx.request.body
    const res = await UserModal.register(content)
    ctx.body = res.data
    ctx.status = res.status
  },
  login: async (ctx) => {
    let content = ctx.request.body
    const res = await UserModal.login(content)
    ctx.body = res.data
    ctx.status = res.status
  },
  getInfoByToken: async (ctx) => {
    let content = ctx.request.headers.authorization
    let id = new Jwt(content).verifyToken();
    if (id !== 'err') {
      const res = await UserModal.get(id)
      ctx.body = res.data
      ctx.status = res.status
    } else {
      ctx.status = 403
    }
  }
}

