import React from 'react'
import { Route, Router, Switch } from 'dva/router'
import App from 'pages'
import Login from 'pages/login'
import NotFound from 'pages/NotFound'

export default function (props) {
  const { history } = props
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/404' component={NotFound} />
      </Switch>
    </Router>
  )
}