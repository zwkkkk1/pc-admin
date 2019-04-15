const _ = require('lodash')
const ProductModel = require('../models/product')

module.exports = {
  add: async (ctx) => {
    const content = ctx.request.body
    const res = await ProductModel.add(content)
    ctx.body = _.pick(res, ['name', 'price', 'desc', 'images', 'status'])
  },
  edit: async (ctx) => {
    const content = ctx.request.body
    await ProductModel.edit(content)
    ctx.status = 200
  },
  get: async (ctx) => {
    const res = await ProductModel.get(ctx.params.id)
    ctx.body = res
  },
  getList: async (ctx) => {
    const res = await ProductModel.getList()
    ctx.body = res
  }
}