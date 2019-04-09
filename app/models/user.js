import { login, register } from 'services/user'
export default {
  namespace: 'user',
  state: {
    user: {},
  },
  effects: {
    * login({ payload: { user } }, { call, put }) {
      const result = yield call(login, user)
      yield put({ type: 'setData', payload: { user: result } })
      return result
    },
    * register({ payload: { user } }, { call }) {
      const result = yield call(register, user)
      yield put({ type: 'setData', payload: { user: result } })
      return result
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}