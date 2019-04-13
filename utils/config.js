module.exports = {
  url: 'http://localhost',
  port: '3000',
  uploadImageLimit: {
    type: ['jpg', 'jpeg', 'gif', 'png'],
    limit: 4 * 1024 * 1024 // 最大上传 4M
  }
}