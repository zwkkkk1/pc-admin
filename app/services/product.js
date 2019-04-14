import { request } from 'utils'

export const add = (content) => (
  request.post('/product/add', content)
)