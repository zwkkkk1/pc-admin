const multer = require('koa-multer')
const path = require('path')

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

const upload = multer({ storage })

module.exports = upload