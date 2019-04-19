import React from 'react'
import { connect } from 'dva'
import { Layout, Modal, Dropdown, Menu, Avatar } from 'antd'
import { history } from 'utils'
import { BreadCrumb } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'

const { Header, Content } = Layout;

import './style'

@connect(mapStateToProps, mapDispatchToProps)
class DocumentLayout extends React.PureComponent {
  constructor(props) {
    super(props)
    const { breadCrumb } = this.props
    document.title = breadCrumb ? breadCrumb.split('/')[breadCrumb.split('/').length - 1] : '后台管理'
  }

  componentDidMount() {
    const { onEnter } = this.props
    onEnter && onEnter()
  }

  handleLogout() {
    const { logout } = this.props
    Modal.confirm({
      title: '您确定退出系统?',
      onOk: () => {
        logout && logout()
        history.replace('/login')
      }
    })
  }

  render() {
    const { user: { username, avatar }, breadCrumb: map, user } = this.props
    const dropMenu = (
      <Menu>
        <Menu.Item>
          <a href='/app/setting/person'>个人设置</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.handleLogout.bind(this)}>退出</a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Layout>
        <Header className='layout-header'>
          <BreadCrumb
            map={map}
          />
          {user && username && (
            <Dropdown overlay={dropMenu}>
              <div className='header-right-wrapper'>
                <Avatar className='avatar-img' src={avatar} />
                <p>{username}</p>
              </div>
            </Dropdown>
          )}
        </Header>
        <Content className='layout-content'>
          {React.Children.only(this.props.children)}
        </Content>
      </Layout>
    )
  }
}

export default DocumentLayout