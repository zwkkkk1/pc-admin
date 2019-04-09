import { request } from 'utils'

export const login = (user) => (
  request.post('/user/login', user)
)

export const register = (user) => (
  request.post('/user/register', user)
)