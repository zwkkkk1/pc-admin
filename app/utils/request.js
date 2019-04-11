import axios from 'axios'
import { message } from 'antd'
import { history } from 'utils'

const instance = axios.create({
  baseURL: '/api',
  headers: { 'Authorization': localStorage.getItem('token') }
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