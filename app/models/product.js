import { add } from '../services/product'

export default {
  namespace: 'product',
  state: {},
  effects: {
    * add({ payload: { content } }, { call }) {
      const result = yield call(add, { ...content, images: content.images.map(item => item.url) })
      return result
    }
  }
}