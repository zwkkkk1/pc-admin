import UserModel from './user'
import ProductModel from './product'
import CategoryModel from './category'
const models = [
  UserModel,
  ProductModel,
  CategoryModel
]

export default (app) => {
  const _models = Object.assign([], models)
  _models.forEach(model => {
    app.model(model)
  })
}