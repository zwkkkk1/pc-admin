import { request } from 'utils'
const qs = require('qs')

export const add = (content) => (
  request.post('/product/add', content)
)

export const edit = (content, id) => (
  request.post(`/product/${id}`, content)
)

export const productDel = (id) => (
  request.delete(`/product/${id}`)
)

export const getList = (condition) => (
  request.get('/product/list', {
    params: condition,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
  })
)

export const productGet = (id) => (
  request.get(`/product/${id}`)
)