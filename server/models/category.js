const mongoose = require('mongoose')
const myError = require('../utils/error')

// 后端接口返回的字段
const backMap = 'name level createdAt childCategory'

const Schema = mongoose.Schema

let CategoryModel

const categorySchema = new Schema({
  name: String,
  level: { type: Number, default: 1 },
  children: { type: Array, ref: 'Category' }
}, {
  timestamps: true
})

categorySchema.statics = {
  add: async content => {
    const { name, parentID, ...rest } = content
    myError.group([
      [ 503, '类目名称不得为空', !name ]
    ])
    let result = await CategoryModel.create({ name, ...rest })
    if (parentID) {
      const parent = await CategoryModel.findById(parentID)
      result = await CategoryModel.findByIdAndUpdate(parentID, { children: [ ...parent.children, result._id ]})
    }
    return result
  },
  edit: async (id, params) => {
    const result = await CategoryModel.findByIdAndUpdate(id, params)
    return result
  },
  delete: async (id) => {
    const { children } = await CategoryModel.findByIdAndRemove(id)
    if (children.length) {
      children.forEach(async (child) => {
        await CategoryModel.findByIdAndRemove(child)
      })
    }
    return 'success'
  },
  getList: async (condition) => {
    const list = await CategoryModel.find(condition, backMap).populate({
      path: 'children',
      select: backMap,
      model: 'Category'
    })
    return list
  }
}

CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel

