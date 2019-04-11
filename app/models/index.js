import UserModel from './user'
const models = [
  UserModel
]

export default (app) => {
  const _models = Object.assign([], models)
  _models.forEach(model => {
    app.model(model)
  })
}