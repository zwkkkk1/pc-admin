import React from 'react'
import { Route, Router, Switch } from 'dva/router'
import Pages  from 'pages'
import { history } from 'utils'
import AuthRouter from 'components/AuthRouter'

const { App, Login, NotFound } = Pages

class Index extends React.PureComponent {
  componentDidMount() {
    const { history: { replace } } = this.props
    if (localStorage.getItem('token')) {
      replace('/app')
    } else {
      replace('/login')
    }
  }

  render() {
    return (<div>加载中...</div>)
  }
}

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact
        path='/'
        component={Index}
      />
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
