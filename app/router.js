import React from 'react'
import { Route, Router, Switch } from 'dva/router'
import App from 'pages'
import Login from 'pages/login'
import NotFound from 'pages/NotFound'
import AuthRouter from 'components/AuthRouter'

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