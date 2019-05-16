import { login, register, getUserByToken, getUserList, modifyUserInfo, getCollection, addCollect, delCollect } from 'services/user'

const initList = {
  data: [],
  num: 0
}

export default {
  namespace: 'user',
  state: {
    user: {},
    collection: {
      data: {},
      num: 0
    },
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
      return yield call(modifyUserInfo, content)
    },
    * clearList(_, { put }) {
      return yield put({ type: 'setData', payload: { list: initList } })
    },
    // 获取用户收藏列表
    * getCollection(_, { call, put }) {
      const { num, data } = yield call(getCollection)
      let dataMap = {}
      data.forEach(({ pid, ...restParams }) => dataMap[pid] = restParams)
      return yield put({ type: 'setData', payload: { collection: { num, data: dataMap } } })
    },
    * addCollect({ payload: { product } }, { call }) {
      const { uid: { nickname, username }, name, mainImages, images, category, price, _id } = product
      const params = {
        username: nickname || username,
        name,
        price,
        pid: _id,
        mainImage: [mainImages[0] || images[0]],
        category: category.map(item => item.name)
      }

      return yield call(addCollect, params)
    },
    * delCollect({ payload: { pid } }, { call }) {
      return yield call(delCollect, pid)
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}