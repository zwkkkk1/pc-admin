import React from 'react'
import { Tabs } from 'antd'
import CanvasNest from 'canvas-nest.js'
import Form from './form/index'

import './style'

const TabPane = Tabs.TabPane
const config = {
  color: '24, 144, 255',
  count: 108,
}

export default class Login extends React.PureComponent {
  componentDidMount() {
    this.cn = new CanvasNest(document.getElementById('root'), config)
  }

  componentWillUnmount() {
    this.cn.destory()
  }

  render() {
    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <div className='login-wrapper'>
          <Tabs tabBarStyle={{ display: 'flex', justifyContent: 'center' }} defaultActiveKey='0'>
            <TabPane tab='登录' key='0'><Form btnText='登录' /></TabPane>
            <TabPane tab='注册' key='1'><Form btnText='注册' /></TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
