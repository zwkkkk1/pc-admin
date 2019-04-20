import { add, getList, productGet, edit } from '../services/product'

export default {
  namespace: 'product',
  state: {
    list: [],
    itemMap: {}
  },
  effects: {
    * add({ payload: { content } }, { call, select }) {
      const user = yield select(state => state.user.user)
      const result = yield call(add, { ...content, uid: user._id })
      return result
    },
    * edit({ payload: { content, id } }, { call }) {
      const result = yield call(edit, content, id)
      return result
    },
    * getList({ payload: { condition } }, { call, put }) {
      const list = yield call(getList, condition)
      yield put({ type: 'setData', payload: { list } })
    },
    * productGet({ payload: { id } }, { call, put, select }) {
      const itemMap = yield select(state => state.product.itemMap)
      const result = yield call(productGet, id)
      itemMap[id] = result
      yield put({ type: 'setData', payload: { itemMap } })
    },
    * clearList(_, { put }) {
      yield put({ type: 'setData', payload: { list: []} })
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}