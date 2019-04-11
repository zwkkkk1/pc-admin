const mongoose = require('mongoose')
const Jwt = require('../utils/token')
const Schema = mongoose.Schema
const { hashPassword, comparePassword } = require('../utils/HashPassword')

let UserModel

const userSchema = new Schema({
  username: { type: String, trim: true, unique: true },
  password: String
}, {
  timestamps: true
})

userSchema.statics = {
  register: async (...args) => {
    const { username, password } = args[0]
    if (username === '' || password === '') {
      return { status: 401, data: '用户名或密码不得为空' }
    }
    const user = await UserModel.findOne({ username })
    if (user) {
      return { status: 409, data: '用户名已存在' }
    }
    await hashPassword(password).then(({ password, salt }) => {
      UserModel.create({ username, password, salt })
    })
    return { status: 200, data: '注册成功' }
  },

  login: async (...args) => {
    const { username, password } = args[0]
    const user = await UserModel.findOne({ username })
    if (!user) {
      return { status: 500, data: '用户不存在' }
    }
    if (comparePassword(password, user.password)) {
      const token = new Jwt(user._id).generateToken()
      return { status: 200, data: token }
    } else {
      return { status: 500, data: '密码错误' }
    }
  },

  get: async (id) => {
    const user = await UserModel.findById(id, 'username _id')
    if (!user) {
      return { status: 500, data: '用户不存在' }
    }
    return { status: 200, data: user }
  }
}

UserModel = mongoose.model('User', userSchema)

module.exports = UserModel