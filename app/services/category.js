import { request } from 'utils'

export const add = (content) => (
  request.post('/category', content)
)

export const categoryDelete = (id) => (
  request.delete('/category', {
    params: { id }
  })
)

export const getList = (condition) => (
  request.get('/category/list', {
    params: condition
  })
)