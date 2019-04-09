import React from 'react'
import { BrowserRouter as Router, withRouter, Route } from 'dva/router'
import { Layout } from 'antd'
import Menu from 'components/layout/Menu'
import BreadCrumb from 'components/layout/BreadCrumb'
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
    console.log('index render >>> ', this.props)
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
              // return <AuthRouter exact={!!exact} path={alias} component={component} />
              return <Route exact={!!exact} path={alias} component={component} />
            })}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Application

