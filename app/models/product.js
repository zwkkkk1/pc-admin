import { add, edit, productDel, getList, productGet } from '../services/product'

const initList = {
  data: [],
  num: 0
}

export default {
  namespace: 'product',
  state: {
    list: initList,
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
    * delete({ payload: { id } }, { call }) {
      return yield call(productDel, id)
    },
    * getList({ payload: { condition } }, { call, put }) {
      const list = yield call(getList, condition)
      return yield put({ type: 'setData', payload: { list } })
    },
    * productGet({ payload: { id } }, { call, put, select }) {
      const itemMap = yield select(state => state.product.itemMap)
      const result = yield call(productGet, id)
      itemMap[id] = result
      yield put({ type: 'setData', payload: { itemMap } })
    },
    * clearList(_, { put }) {
      yield put({ type: 'setData', payload: { list: initList } })
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}