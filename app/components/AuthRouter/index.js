import React from 'react'
import { connect } from 'dva'
import { Route, Redirect } from 'dva/router'
import { mapStateToProps } from './connect';

@connect(mapStateToProps)
export default class AuthRouter extends React.PureComponent {
  render() {
    const { user, component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={props => (
        Object.keys(user).length > 0 ? (
          <Component {...props} />
          ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
      )}/>
    )
  }
}