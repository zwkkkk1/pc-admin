import React from 'react'
import { Route } from 'dva/router'
import { Layout } from 'antd'
import { DocumentLayout, Menu } from 'components'
import Pages from 'pages'
import { menuMap, routeConfig } from 'utils'

import './style'

const { Sider } = Layout;

class Application extends React.Component {
  handleClickMenu(item) {
    const { link } = item
    this.props.history.push(link)
  }

  render() {
    return (
      <Layout className='layout-wrapper'>
        <Sider collapsible>
          <Menu
            map={menuMap}
            handleClickMenu={this.handleClickMenu.bind(this)} 
          />
        </Sider>
          {routeConfig.map(route => {
            const { exact, alias, component, breadCrumb } = route
            const Component = Pages[component]
            return <Route exact={!!exact} path={alias} component={props => (
              <DocumentLayout breadCrumb={breadCrumb}>
                <Component {...props} />
              </DocumentLayout>
            )} />
          })}
      </Layout>
    );
  }
}

export default Application

