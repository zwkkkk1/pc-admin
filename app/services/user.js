import { request, config } from 'utils'

export const login = (user) => (
  request.post('/user/login', user)
)

export const register = (user) => {
  const { aliyunConfig: { region, bucket } } = config
  return request.post('/user/register', {
    ...user,
    avatar: [`http://${bucket}.${region}/avatar/${Math.floor(Math.random()*100 % 19) + 1}.jpg`]
  })
}

export const edit = (content, id) => (
  request.post(`/user/${id}`, content)
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

export const getCollection = () => (
  request.get('/collect')
)

export const addCollect = (product) => (
  request.post('/collect', product)
)

export const delCollect = (pid) => (
  request.delete('/collect', {
    params: { pid }
  })
)

export const getCount = () => (
  request.get('/common/count')
)