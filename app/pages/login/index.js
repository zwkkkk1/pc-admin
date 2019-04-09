import React from 'react'
import { connect } from 'dva'
import { Tabs, message } from 'antd'
import CanvasNest from 'canvas-nest.js'
import Form from './form/index'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './style'

const TabPane = Tabs.TabPane
const config = {
  color: '24, 144, 255',
  count: 108,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends React.PureComponent {
  componentDidMount() {
    this.cn = new CanvasNest(document.getElementById('root'), config)
  }

  handleSubmit = type => async user => {
    const { login, register, history: { replace } } = this.props
    let result
    if (type === 'login') {
      result = await login(user)
    } else {
      result = await register(user)
    }
    if (result) {
      message.info(`${type === 'login' ? '登录' : '注册'}成功`, 1).then(() => replace('/app/'))
    }
  }

  render() {
    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <div className='login-wrapper'>
          <Tabs tabBarStyle={{ display: 'flex', justifyContent: 'center' }} defaultActiveKey='0'>
            <TabPane tab='登录' key='0'><Form btnText='登录' handleSubmit={this.handleSubmit('login')} /></TabPane>
            <TabPane tab='注册' key='1'><Form btnText='注册' handleSubmit={this.handleSubmit('register')} /></TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
