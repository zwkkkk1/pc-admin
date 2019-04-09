import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.response.use(({ data, status }) => {
  if (status === 200) {
    return data
  }
}, ({ response }) => {
  const { data, status } = response
  message.error(data, 1)
})

export default instance