import axios from 'axios'
import { message } from 'antd'
import { history } from 'utils'

// 不用 token 的请求
const whiteList = [
  '/user/login',
  '/user/register'
]

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use((config) => {
  if (whiteList.indexOf(config.url) === -1) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
  }
  return config
})

instance.interceptors.response.use(({ data, status }) => {
  if (status === 200) {
    return data
  }
}, ({ response }) => {
  const { data, status } = response
  message.error(data, 1).then(() => {
    if ([401, 403].indexOf(status) !== -1) {
      history.replace('/login')
    }
  })
})

export default instance