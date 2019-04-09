const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword, comparePassword } = require('../utils/HashPassword')

const userSchema = new Schema({
  username: { type: String, trim: true, unique: true },
  password: String,
}, {
  timestamps: true,
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
      return { status: 200, data: user }
    } else {
      return { status: 500, data: '密码错误' }
    }
  }
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel