import React from 'react'
import { Route, Router, Switch } from 'dva/router'
import Pages  from 'pages'
import { history } from 'utils'
import AuthRouter from 'components/AuthRouter'

const { App, Login, NotFound } = Pages

export default () => (
  <Router history={history}>
    <Switch>
      <Route path='/login'
        component={Login}
      />
      <AuthRouter path='/app'
        component={App}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
