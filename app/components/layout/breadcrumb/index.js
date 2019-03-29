import React from 'react'
import { Breadcrumb } from 'antd';

import './style'

export default class myBreadcrumb extends React.Component {
  render() {
    const { name, subName } = this.props
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {subName && <Breadcrumb.Item>{subName}</Breadcrumb.Item>}
        {name && <Breadcrumb.Item>{name}</Breadcrumb.Item>}
      </Breadcrumb>
    )
  }
}
