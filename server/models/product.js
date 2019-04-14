const mongoose = require('mongoose')
const myError = require('../utils/error')

const Schema = mongoose.Schema

let ProductModel

const productSchema = new Schema({
  name: String,
  desc: String,
  status: { type: Number, default: 1 },
  price: Number,
  images: Array
}, {
  timestamps: true
})

productSchema.statics = {
  add: async content => {
    const { name, price } = content
    if (!name) {
      throw new myError(503, '商品名称不得为空')
    }
    if (!price) {
      throw new myError(503, '商品价格不得为空')
    }
    const product = await ProductModel.create(content)
    return product
  }
}

ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel

