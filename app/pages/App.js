import React from 'react'
import { connect } from 'dva'
import { Route } from 'dva/router'
import { Layout } from 'antd'
import { DocumentLayout, Menu, Loading } from 'components'
import Pages from 'pages'
import { menuMap, routeConfig } from 'utils'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './style'

const { Sider } = Layout;

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
    this.props.history.push(link)
  }

  render() {
    const { user, loading } = this.props
    return (
      <Layout className='layout-wrapper'>
        <Loading visible={loading} />
        <Sider collapsible>
          <Menu
            handleClickMenu={this.handleClickMenu.bind(this)}
            map={menuMap}
          />
        </Sider>
          {routeConfig.app.map(route => {
            const { exact, alias, component, breadCrumb } = route
            const Component = Pages[component]
            return (
            <Route
              exact={!!exact}
              key={`content_${alias}`}
              path={alias}
              render={props => (
                  <DocumentLayout
                    breadCrumb={breadCrumb}
                    user={user}
                  >
                    <Component {...props} />
                  </DocumentLayout>
                )}
            />)
          })}
      </Layout>
    );
  }
}

export default Application

