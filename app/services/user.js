import { request } from 'utils'

export const login = (user) => (
  request.post('/user/login', user)
)

export const register = (user) => (
  request.post('/user/register', {
    ...user,
    avatar: [`http://pq1kytk8k.bkt.clouddn.com/avatar_${Math.floor(Math.random()*100 % 19) + 1}.jpg`]
  })
)

export const getUserByToken = () => (
  request.get('/user/info')
)

export const modifyUserInfo = (content) => (
  request.post('/user/info', content)
)

export const getUserList = (condition) => (
  request.get('/user/list', {
    params: condition
  })
)
