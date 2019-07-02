const mongoose = require('mongoose')
const Jwt = require('../utils/token')
const myError = require('../utils/error')
const Schema = mongoose.Schema
const { hashPasswordSync, compareSync } = require('../utils/HashPassword')

let UserModel

// 后端接口返回的字段
const backMap = require('../utils/backMap').user

const userSchema = new Schema({
  username: { type: String, trim: true, unique: true },
  password: String,
  loginAt: { type: Date, default: Date.now },
  status: { type: Number, default: 1 },
  nickname: { type: String, default: '' },
  avatar: Array,
  sign: { type: String, default: '' },
  sex: { type: Number, default: 1 }, // 1 男 0 女
  level: { type: Number, default: 1 },  // 1普通用户 2管理员 3超级管理员
  contact: { type: Array, default: []}  // 联系方式
}, {
  autoIndex: true,
  timestamps: true
})

userSchema.statics = {
  register: async ({ username, password, ...restParams }) => {
    if (!username || !password) {
      throw new myError(500, '用户名或密码不得为空')
    }
    let user = await UserModel.findOne({ username })
    if (user) {
      throw new myError(409, '用户名已存在')
    }
    const { hash } = hashPasswordSync(password)
    user = await UserModel.create({ ...restParams, username, password: hash })
    const token = new Jwt({ id: user._id, level: user.level }).generateToken()
    return token
  },
  edit: async (id, content) => {
    const result = await UserModel.findByIdAndUpdate(id, content)
    return result
  },
  login: async content => {
    const { username, password } = content
    const user = await UserModel.findOne({ username })
    myError.group([
      [ 500, '用户不存在', !user ],
      [ 500, '用户已被冻结，请与管理员联系', !user.status ]
    ])
    if (compareSync(password, user.password)) {
      const token = new Jwt({ id: user._id, level: user.level }).generateToken()
      return token
    } else {
      throw new myError(500, '密码错误')
    }
  },
  update: async (id, content) => {
    const result = await UserModel.findByIdAndUpdate(id, content)
    return result
  },
  get: async id => {
    const user = await UserModel.findById(id, backMap)
    if (!user) {
      throw new myError(403, '用户不存在，请重新登录')
    }
    return user
  },
  getList: async ({ type, pageSize, pageNo, ...restParams }) => {
    const level = type === 'back' ? { $gt: 1 } : { $lte: 1 }
    const condition = { ...restParams, level }
    const list = await UserModel.find(condition, backMap, (err) => {
      if (err) throw new myError('获取用户列表失败')
    }).skip((pageNo - 1) * pageSize).limit(Number(pageSize))
    return {
      data: list,
      num: await UserModel.count(condition)
    }
  },
  getCount: async ({ type, ...restParams }) => {
    const level = type === 'back' ? { $gt: 1 } : { $lte: 1 }
    return await UserModel.count({ ...restParams, level })
  }
}

UserModel = mongoose.model('User', userSchema)

module.exports = UserModel