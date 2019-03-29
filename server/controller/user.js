const UserModal = require('../model/user')

module.exports = {
  register: async (ctx, next) => {
    let content = ctx.request.body
    const res = await UserModal.register(content)
    ctx.body = res.message
    ctx.status = res.status
  },
  login: async (ctx, next) => {
    let content = ctx.request.body
    const res = await UserModal.login(content)
    ctx.body = res.message
    ctx.status = res.status
  }
}