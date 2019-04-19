const Jwt = require('../utils/token')
const UserModal = require('../models/user')

module.exports = {
  register: async (ctx) => {
    const content = ctx.request.body
    const res = await UserModal.register(content)
    ctx.body = res
  },
  login: async (ctx) => {
    const content = ctx.request.body
    const res = await UserModal.login(content)
    ctx.body = res
  },
  getInfoByToken: async (ctx) => {
    const token = ctx.request.headers.authorization
    const id = new Jwt(token).verifyToken();
    const res = await UserModal.get(id)
    await UserModal.update(id, { loginAt: Date.now() })
    ctx.body = res
  },
  modifyInfo: async (ctx) => {
    const token = ctx.request.headers.authorization
    const id = new Jwt(token).verifyToken();
    const res = await UserModal.update(id, ctx.request.body)
    ctx.body = res
  },
  getBackList: async (ctx) => {
    const res = await UserModal.getList('back')
    ctx.body = res
  }
}

