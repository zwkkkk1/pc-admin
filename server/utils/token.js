const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const myError = require('../utils/error')

class Token {
  constructor(data) {
    this.data = data
  }

  // 生成 Token
  generateToken() {
    const data = this.data
    const created = Math.floor(Date.now() / 1000)
    const cert = fs.readFileSync(path.join(__dirname, './pem/private_key.pem'))
    const token = jwt.sign({ data, exp: created + 60 * 60 * 72 }, cert, { algorithm: 'RS256' })
    return token
  }

  // 校验 Token
  verifyToken() {
    const token = this.data
    const cert = fs.readFileSync(path.join(__dirname, './pem/public_key.pem'))
    let res
    try {
      const result = jwt.verify(token, cert, { algorithm: 'RS256' }) || {}
      const { exp = 0 } = result, current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = result.data || {}
      }
    } catch (err) {
      throw new myError(403, '登录失效，请重新登录')
    }
    return res
  }
}

module.exports = Token