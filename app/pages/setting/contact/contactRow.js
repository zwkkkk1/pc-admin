import React from 'react'
import { Row, Col, Input, Switch, Icon } from 'antd'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'

@connect(mapStateToProps, mapDispatchToProps)
class ContactRow extends React.PureComponent {
  render () {
    const { title, key, user: { contact } } = this.props
    return (
      <Row style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }} gutter={16}>
        <Col span={4}>{title}</Col>
        <Col span={8}><Input defaultValue={contact[key] || ''} /></Col>
        <Col span={4}>
          <Switch
            checkedChildren={<Icon type='check' />}
            unCheckedChildren={<Icon type='close' />}
            defaultChecked
          />
        </Col>
      </Row>
    )
  }
}

export default ContactRow