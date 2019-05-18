const Jwt = require('../utils/token')
const CollectModel = require('../models/collect')

module.exports = {
  getCollection: async (ctx) => {
    const token = ctx.request.headers.authorization
    const { id } = new Jwt(token).verifyToken()
    const res = await CollectModel.getCollection(id)
    ctx.body = res
  },
  addCollect: async (ctx) => {
    const token = ctx.request.headers.authorization
    const { id } = new Jwt(token).verifyToken()
    const res = await CollectModel.addCollect({ ...ctx.request.body, id })
    ctx.body = res
  },
  delCollect: async (ctx) => {
    const token = ctx.request.headers.authorization
    const { id } = new Jwt(token).verifyToken()
    const res = await CollectModel.delCollect(id, ctx.query.pid)
    ctx.body = res
  }
}

