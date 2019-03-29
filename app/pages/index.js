import React from 'react'
import { BrowserRouter as Router, withRouter, Route } from 'dva/router'
import { Layout } from 'antd'
import Menu from 'components/layout/menu'
import BreadCrumb from 'components/layout/breadcrumb'
import { menuMap, routeConfig } from 'utils'

import './style'

const { Header, Content, Sider } = Layout;

class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: {
        name: '',
        subName: '',
      }
    }
  }

  handleClickMenu(item, subName) {
    const { name, link } = item
    this.setState({
      menu: { name, subName }
    })
    this.props.history.push(link)
  }

  render() {
    const { menu: { name, subName } } = this.state
    return (
      <Layout className='layout-wrapper'>
        <Sider collapsible>
          <Menu
            map={menuMap}
            handleClickMenu={this.handleClickMenu.bind(this)} 
          />
        </Sider>
        <Layout>
          <Header className='layout-header'>
            <BreadCrumb name={name} subName={subName} />
          </Header>
          <Content className='layout-content'>
            {routeConfig.map(route => {
              const { exact, alias, component } = route
              return <Route exact={!!exact} path={alias} component={component}></Route>
            })}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Application)

