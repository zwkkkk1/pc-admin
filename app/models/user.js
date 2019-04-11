import { login, register, getUserByToken } from 'services/user'

export default {
  namespace: 'user',
  state: {
    user: {}
  },
  effects: {
    * login({ payload: { user } }, { call }) {
      const result = yield call(login, user)
      localStorage.setItem('token', result)
      return result
    },
    * register({ payload: { user } }, { call, put }) {
      const result = yield call(register, user)
      yield put({ type: 'setData', payload: { user: result } })
      return result
    },
    * logout(_, { put }) {
      localStorage.removeItem('token')
      yield put({ type: 'setData', payload: { user: {} } })
    },
    // 通过登录注册获得的 token，获取user信息
    * getLoginUserInfo(_, { call, put }) {
      const token = localStorage.getItem('token')
      if (token) {
        const result = yield call(getUserByToken, localStorage.getItem('token'))
        yield put({ type: 'setData', payload: { user: result } })
        return result
      }
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}