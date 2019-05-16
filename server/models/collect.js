const mongoose = require('mongoose')
const myError = require('../utils/error')

// 后端接口返回的字段
const collectBackMap = require('../utils/backMap').collect

const Schema = mongoose.Schema

let CollectModel

const collectSchema = new Schema({
  uid: String,
  pid: String,
  // 下为合理冗余字段
  name: String,
  category: Array,
  price: Number,
  mainImages: Array,
  username: String
}, {
  timestamps: true
})

collectSchema.statics = {
  getCollection: async (uid) => {
    const list = await CollectModel.find({ uid }, collectBackMap, (err) => {
      if (err) throw new myError('获取收藏列表失败')
    })
    return {
      data: list,
      num: await CollectModel.count({ uid })
    }
  },
  addCollect: async (collection) => {
    const result = await CollectModel.create(collection)
    return result
  },
  delCollect: async (uid, pid) => {
    const result = await CollectModel.findOneAndRemove({ uid, pid })
    return result
  }
}

CollectModel = mongoose.model('Collect', collectSchema)

module.exports = CollectModel

