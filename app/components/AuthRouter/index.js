import React from 'react'
import { Route, Redirect } from 'dva/router'

export default class AuthRouter extends React.PureComponent {
  render() {
    const { component: Component, ...rest } = this.props
    const userToken = localStorage.getItem('token')

    return (
      <Route
        {...rest}
        render={props => (
            userToken ? (
            <Component {...props} />
            ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }}
            />
          )
        )}
      />
    )
  }
}