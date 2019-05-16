import React from 'react'
import { connect } from 'dva'
import { Route, Switch } from 'dva/router'
import { Layout } from 'antd'
import { DocumentLayout, Menu, Loading } from 'components'
import Pages from 'pages'
import { menuMap, router } from 'utils'
import { mapStateToProps, mapDispatchToProps } from './connect'
import NotFound from './NotFound'

import './style'

const { Sider } = Layout;
const { routes } = router

@connect(mapStateToProps, mapDispatchToProps)
class Application extends React.Component {
  componentDidMount() {
    const { user , getLoginUserInfo } = this.props
    if (Object.keys(user).length === 0) {
      getLoginUserInfo()
    }
  }

  handleClickMenu(item) {
    const { link } = item
    this.props.history.push('/app' + link)
  }

  render() {
    const { user, loading, user: { level: userLevel } } = this.props
    return (
      <Layout className='layout-wrapper'>
        <Loading visible={loading} />
        <Sider collapsible>
          <Menu
            handleClickMenu={this.handleClickMenu.bind(this)}
            map={menuMap}
            user={user}
          />
        </Sider>
        <Switch>
          {Object.keys(routes.app).map(key => {
            const route = routes.app[key]
            const { exact, component, breadCrumb, level } = route
            const Component = Pages[component]
            if (userLevel < level) return
            return (
            <Route
              exact={!!exact}
              key={`content_${key}`}
              path={key}
              render={props => (
                  <DocumentLayout
                    {...props}
                    breadCrumb={breadCrumb}
                    user={user}
                  >
                    <Component {...props} />
                  </DocumentLayout>
                )}
            />)
          })}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default Application

