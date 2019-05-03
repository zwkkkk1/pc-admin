import { login, register, getUserByToken, getUserList, modifyUserInfo } from 'services/user'

const initList = {
  data: [],
  num: 0
}

export default {
  namespace: 'user',
  state: {
    user: {},
    list: initList
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
    * getUserList({ payload: { condition } }, { call, put }) {
      const result = yield call(getUserList, condition)
      yield put({ type: 'setData', payload: { list: result } })
    },
    * modifyUserInfo({ payload: { content } }, { call }) {
      const result = yield call(modifyUserInfo, content)
      return result
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