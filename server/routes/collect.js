const Jwt = require('../utils/token')
const CollectModel = require('../models/collect')

module.exports = {
  getCollection: async (ctx) => {
    const token = ctx.request.headers.authorization
    const uid = new Jwt(token).verifyToken()
    const res = await CollectModel.getCollection(uid)
    ctx.body = res
  },
  addCollect: async (ctx) => {
    const token = ctx.request.headers.authorization
    const uid = new Jwt(token).verifyToken()
    const res = await CollectModel.addCollect({ ...ctx.request.body, uid })
    ctx.body = res
  },
  delCollect: async (ctx) => {
    const token = ctx.request.headers.authorization
    const uid = new Jwt(token).verifyToken()
    const res = await CollectModel.delCollect(uid, ctx.query.pid)
    ctx.body = res
  }
}

