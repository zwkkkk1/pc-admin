const Jwt = require('../utils/token')
const UserModel = require('../models/user')

module.exports = {
  register: async (ctx) => {
    const content = ctx.request.body
    const res = await UserModel.register(content)
    ctx.body = res
  },
  login: async (ctx) => {
    const content = ctx.request.body
    const res = await UserModel.login(content)
    ctx.body = res
  },
  edit: async (ctx) => {
    const content = ctx.request.body
    await UserModel.edit(ctx.params.id, content)
    ctx.status = 200
  },
  getInfoByToken: async (ctx) => {
    const token = ctx.request.headers.authorization
    const { id } = new Jwt(token).verifyToken();
    const res = await UserModel.get(id)
    await UserModel.update(id, { loginAt: Date.now() })
    ctx.body = res
  },
  modifyInfo: async (ctx) => {
    const token = ctx.request.headers.authorization
    const { id } = new Jwt(token).verifyToken();
    const res = await UserModel.update(id, ctx.request.body)
    ctx.body = res
  },
  getList: async (ctx) => {
    const res = await UserModel.getList(ctx.query)
    ctx.body = res
  }
}

