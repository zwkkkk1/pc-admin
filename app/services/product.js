import { request } from 'utils'

export const add = (content) => (
  request.post('/product/add', content)
)

export const edit = (content, id) => (
  request.post('/product/edit', { ...content, id })
)

export const getList = (condition) => (
  request.get('/product/list', {
    params: condition
  })
)

export const productGet = (id) => (
  request.get(`/product/${id}`)
)