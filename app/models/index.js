import UserModel from './user'
import ProductModel from './product'
const models = [
  UserModel,
  ProductModel
]

export default (app) => {
  const _models = Object.assign([], models)
  _models.forEach(model => {
    app.model(model)
  })
}