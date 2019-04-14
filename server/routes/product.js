const _ = require('lodash')
const ProductModel = require('../models/product')

module.exports = {
  add: async (ctx) => {
    const content = ctx.request.body
    const res = await ProductModel.add(content)
    ctx.body = _.pick(res, ['name', 'price', 'desc', 'images', 'status'])
  }
}