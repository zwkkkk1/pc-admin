const bcrypt = require('bcrypt')

// 生成 salt 迭代次数
const saltRounds = 10

const hashPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err)
      bcrypt.hash(password, salt, (err, password) => {
        if (err) reject(err)
        resolve({ salt, password })
      })
    })
  })
}

const hashPasswordSync = password => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return { salt, hash }
}

const compareSync = bcrypt.compareSync

module.exports = { hashPassword, hashPasswordSync, compareSync }