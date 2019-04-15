import { add, getList, productGet, edit } from '../services/product'

export default {
  namespace: 'product',
  state: {
    list: [],
    itemMap: {}
  },
  effects: {
    * add({ payload: { content } }, { call }) {
      const result = yield call(add, { ...content, images: content.images.map(item => item.url) })
      return result
    },
    * edit({ payload: { content, id } }, { call }) {
      const result = yield call(edit, content, id)
      return result
    },
    * getList(_, { call, put }) {
      const list = yield call(getList)
      yield put({ type: 'setData', payload: { list } })
    },
    * productGet({ payload: { id } }, { call, put, select }) {
      const itemMap = yield select(state => state.product.itemMap)
      const result = yield call(productGet, id)
      itemMap[id] = result
      yield put({ type: 'setData', payload: { itemMap } })
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}