import axios from 'axios'
import { Base64, config } from 'utils'
const crytpo = require('crypto')

const getYMD = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate()
  return `${year}${month}${day}`
}

class uploadOSS {
  filename = ''

  // 添加 oss 需要的表单字段
  initFormData(uploadConfig, options) {
    const { aliyunConfig: { AccessKeyID, AccessKeySecret, policyText } } = config
    const { filename, file } = uploadConfig
    const { prefix } = options
    const policyBase64 = Base64.encode(JSON.stringify(policyText))
    const hmac = crytpo.createHmac('sha1', AccessKeySecret)
    const formData = new FormData()
    this.filename = `${prefix}/${getYMD()}_${Date.now()}`
    formData.append('key', this.filename)
    formData.append('policy', policyBase64)
    formData.append('OSSAccessKeyId', AccessKeyID)
    formData.append('success_action_status', '200')
    formData.append('signature', hmac.update(policyBase64).digest().toString('base64'))
    formData.append(filename, file)
    return formData
  }

  // 上传至阿里云OSS
  send(uploadConfig, options = {}) {
    const { aliyunConfig: { region, bucket } } = config
    const { file, onSuccess, onProgress } = uploadConfig
    const baseUrl = `http://${bucket}.${region}`

    const formData = this.initFormData(uploadConfig, options)
    axios.post(baseUrl, formData, {
      onUploadProgress: ({ total, loaded }) => {
        onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file)
      }
    })
    .then((res) =>{
      onSuccess({ ...res, url: `${baseUrl}/${this.filename}` })
    })
  }
}

export default new uploadOSS()