import dva from 'dva'
import createLoading from 'dva-loading'
import { createLogger } from 'redux-logger'
import router from './router'
import model from './models'

const app = dva({
  history: require('history').createBrowserHistory(),
  onAction: createLogger(),
})

app.use(createLoading())

model(app)

app.router(router)
app.start('#root')
