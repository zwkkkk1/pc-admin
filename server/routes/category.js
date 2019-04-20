const CategoryModel = require('../models/category')

module.exports = {
  post: async (ctx) => {
    const { _id, ...restParams } = ctx.request.body
    const res = _id ? await CategoryModel.edit(_id, restParams) : await CategoryModel.add(restParams)
    ctx.body = res
  },
  delete: async (ctx) => {
    const { id } = ctx.query
    await CategoryModel.delete(id)
    ctx.status = 200
  },
  getList: async (ctx) => {
    const res = await CategoryModel.getList(ctx.query)
    ctx.body = res
  }
}

