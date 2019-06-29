import React from 'react'
import { Breadcrumb } from 'antd'

export default class myBreadcrumb extends React.Component {
  render() {
    let { map } = this.props
    map = map ? `首页/${map}` : '首页/'
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {map.split('/').map((item, index) => (
          <Breadcrumb.Item key={`${item}_${index}`}>{item}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }
}
