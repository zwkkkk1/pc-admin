const multer = require('koa-multer')
const path = require('path')
const myError = require('../utils/error')
const { uploadImageLimit: { type, limit } } = require('../../utils/config')

const getFileName = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate()
  return `${year}${month}${day}`
}

const storage = multer.diskStorage({
  destination: path.join(__dirname, `../public/uploads/${getFileName()}`),
  filename:(ctx, file, cb) => {
    const fileNameArr = file.originalname.split('.')
    cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split('/')[0] !== 'image' || type.indexOf(file.mimetype.split('/')[1]) === -1) {
      cb(null, false);
      cb(new myError(503, '请上传jpg、jpeg、gif、png后缀图片'))
    }
    cb(null, true);
  },
  limits: { fieldSize: limit / 1024 / 1024 }
})

module.exports = upload