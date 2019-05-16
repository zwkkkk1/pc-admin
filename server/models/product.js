const mongoose = require('mongoose')
const myError = require('../utils/error')

// 后端接口返回的字段
const backMap = require('../utils/backMap').product
const userBackMap = require('../utils/backMap').user

const Schema = mongoose.Schema

let ProductModel

const productSchema = new Schema({
  name: String,
  uid: String,
  desc: String,
  category: Array,
  status: { type: Number, default: -1 }, // 0 下架，1 正常，-1 待审核 -2 审核失败
  price: Number,
  mainImages: Array,
  images: Array,
  extra: { type: String, default: '' } //存储一些额外信息，如审核失败信息
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
  edit: async (id, content) => {
    const result = await ProductModel.findByIdAndUpdate(id, content)
    return result
  },
  del: async (id) => {
    const result = await ProductModel.findByIdAndRemove(id)
    return result
  },
  get: async id => {
    const product = await ProductModel.findById(id, backMap)
    if (!product) {
      throw new myError(501, '无效id，商品不存在')
    }
    return product
  },
  getList: async (condition) => {
    const { pageSize, pageNo, ...restParams } = condition
    if (condition.name) {
      condition.name = new RegExp(condition.name)
    }
    const list = await ProductModel.find(restParams, backMap, (err) => {
      if (err) throw new myError('获取商品列表失败')
    }).populate([{
      path: 'category',
      model: 'Category'
    }, {
      path: 'uid',
      model: 'User',
      select: userBackMap
    }]).skip((pageNo - 1) * pageSize).limit(Number(pageSize))
    return {
      data: list,
      num: await ProductModel.count(restParams)
    }
  }
}

ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel

