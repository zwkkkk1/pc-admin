import { request } from 'utils'

export const login = (user) => (
  request.post('/user/login', user)
)

export const register = (user) => (
  request.post('/user/register', user)
)

export const getUserByToken = () => (
  request.get('/user/info')
)

export const modifyUserInfo = (content) => (
  request.post('/user/info', content)
)

export const getBackUserList = () => (
  request.get('/user/back/list')
)
