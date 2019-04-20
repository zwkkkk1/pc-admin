import { add, getList, categoryDelete } from '../services/category'

export default {
  namespace: 'category',
  state: {
    list: []
  },
  effects: {
    * add({ payload: { content } }, { call }) {
      return yield call(add, content)
    },
    * delete({ payload: { id } }, { call }) {
      return yield call(categoryDelete, id)
    },
    * getList({ payload: { condition } }, { call, put }) {
      const list = yield call(getList, condition)
      yield put({ type: 'setData', payload: { list } })
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}