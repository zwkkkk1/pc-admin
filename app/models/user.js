import { login, register, getUserByToken, getBackUserList, modifyUserInfo } from 'services/user'

export default {
  namespace: 'user',
  state: {
    user: {},
    backList: []
  },
  effects: {
    * login({ payload: { user } }, { call }) {
      const result = yield call(login, user)
      localStorage.setItem('token', result)
      return result
    },
    * register({ payload: { user } }, { call }) {
      const result = yield call(register, user)
      localStorage.setItem('token', result)
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
        const result = yield call(getUserByToken)
        yield put({ type: 'setData', payload: { user: result || {} } })
        return result
      }
    },
    * getBackUserList(_, { call, put }) {
      const result = yield call(getBackUserList)
      yield put({ type: 'setData', payload: { backList: result } })
    },
    * modifyUserInfo({ payload: { content } }, { call }) {
      const result = yield call(modifyUserInfo, content)
      return result
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}