import { request } from 'utils'

export const add = (content) => (
  request.post('/product/add', content)
)

export const edit = (content, id) => (
  request.post('/product/edit', { ...content, id })
)

export const getList = () => (
  request.get('/product/list')
)

export const productGet = (id) => (
  request.get(`/product/${id}`)
)