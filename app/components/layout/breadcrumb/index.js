import React from 'react'
import { Breadcrumb } from 'antd';

import './style'

export default class myBreadcrumb extends React.Component {
  render() {
    let { map } = this.props
    map = `首页/${map}`
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {map.split('/').map((item, index) => (
          <Breadcrumb.Item key={`${item}_${index}`}>{item}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }
}
