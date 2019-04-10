import React from 'react'
import { Route, Router, Switch } from 'dva/router'
import Pages  from 'pages'
import AuthRouter from 'components/AuthRouter'

const { App, Login, NotFound } = Pages

export default function (props) {
  const { history } = props
  return (
    <Router history={history}>
      <Switch>
        <Route path='/login' component={Login} />
        <AuthRouter path='/app' component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}