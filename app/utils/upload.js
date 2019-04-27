import { request } from 'utils'
import axios from 'axios'

const getYMD = (prefix) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate()
  return prefix ? `${prefix}_${year}${month}${day}` : `${year}${month}${day}`
}

// upload 至七牛云
class upload {
  send(config, options = {}) {
    const { action, filename, file, onSuccess, onProgress } = config
    const { prefix } = options
    const formData = new FormData()
    formData.append(filename, file);
    request
      .post('/common/qiniuToken')
      .then(token => {
        formData.append('key', `${getYMD(prefix)}_${Date.now()}`)
        formData.append('token', token)
        formData.append('x:filename', file.name)
        axios.post(action, formData, {
          onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file)
          }
        })
        .then((res) => {
          onSuccess(res)
        })
      })
  }
}

export default new upload()