import axios from 'axios'
import NProgress from 'nprogress'
import { message } from 'antd'
import { history } from 'utils'

// 不用 token 的请求
const whiteList = [
  '/user/login',
  '/user/register'
]

const errorMap = {
  405: '接口不支持该 Method',
  504: '网关错误'
}

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use((config) => {
  // 页面头部加载条
  NProgress.start()
  if (whiteList.indexOf(config.url) === -1) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
  }
  return config
})

instance.interceptors.response.use(({ data, status }) => {
  NProgress.done();
  if (status === 200) {
    return data
  }
}, ({ response }) => {
  NProgress.done();
  const { data, status } = response
  message.error(errorMap[status] || data, 1).then(() => {
    if ([401, 403].indexOf(status) !== -1) {
      history.replace('/login')
    }
  })
})

export default instance