const mongoose = require('mongoose')
const myError = require('../utils/error')

// 后端接口返回的字段
const backMap = 'name desc price status images mainImages _id'

const Schema = mongoose.Schema

let ProductModel

const productSchema = new Schema({
  name: String,
  desc: String,
  status: { type: Number, default: 1 },
  price: Number,
  mainImages: Array,
  images: Array
}, {
  timestamps: true
})

productSchema.statics = {
  add: async content => {
    const { name, price, mainImages } = content
    myError.group([
      [ 503, '商品名称不得为空', !name ],
      [ 503, '商品价格不得为空', !price ],
      [ 503, '请至少上传1张商品主图', !mainImages.length ]
    ])
    const product = await ProductModel.create(content)
    return product
  },
  edit: async content => {
    const { id, ...rest } = content
    const result = await ProductModel.findByIdAndUpdate(id, rest)
    return result
  },
  get: async id => {
    const product = await ProductModel.findById(id, backMap)
    if (!product) {
      throw new myError(501, '无效id，商品不存在')
    }
    return product
  },
  getList: async () => {
    const list = await ProductModel.find({}, backMap)
    if (list.length) {
      return list
    }
    throw new myError(500, '获取商品列表')
  }
}

ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel

