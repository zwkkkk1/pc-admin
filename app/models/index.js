const models = [
  require('./user').default,
]

export default (app) => {
  const _models = Object.assign([], models)
  _models.forEach(model => {
    app.model(model)
  })
}