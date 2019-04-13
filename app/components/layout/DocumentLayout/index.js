import React from 'react'
import { connect } from 'dva'
import { Layout, Modal } from 'antd'
import { history } from 'utils'
import BreadCrumb from '../BreadCrumb'
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
    const { user, breadCrumb: map } = this.props
    return (
      <Layout>
        <Header className='layout-header'>
          <BreadCrumb
            map={map}
          />
          {user && user.username && (
            <div className='header-right-wrapper'>
              <p>欢迎回来，{user.username}</p>
              <a onClick={this.handleLogout.bind(this)}>退出</a>
            </div>
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