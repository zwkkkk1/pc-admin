import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.response.use((res) => {
  debugger
})

export default instance