const Jwt = require('../utils/token')
const myError = require('../utils/error')
const UserModal = require('../models/user')

module.exports = {
  register: async (ctx) => {
    let content = ctx.request.body
    const res = await UserModal.register(content)
    ctx.body = res
  },
  login: async (ctx) => {
    let content = ctx.request.body
    const res = await UserModal.login(content)
    ctx.body = res
  },
  getInfoByToken: async (ctx) => {
    let content = ctx.request.headers.authorization
    let id = new Jwt(content).verifyToken();
    if (id !== 'err') {
      const res = await UserModal.get(id)
      await UserModal.update(id, { loginAt: Date.now() })
      ctx.body = res
    } else {
      throw new myError(403)
    }
  },
  getBackList: async (ctx) => {
    const res = await UserModal.getList('back')
    ctx.body = res
  }
}

