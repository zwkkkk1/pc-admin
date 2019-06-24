import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import ContactRow from './contactRow'
import { mapStateToProps, mapDispatchToProps } from './connect'

@connect(mapStateToProps, mapDispatchToProps)
class Person extends React.PureComponent {
  render() {
    const { user: { contact } } = this.props
    console.log('contact >>> ', this.props)
    return (
      <div>
        <h4 style={{ marginBottom: '12px' }}>联系方式</h4>
        {contact && (
          <div>
            <ContactRow key='qq' title='QQ号：' />
            <ContactRow key='mobile' title='手机号：' />
            <ContactRow key='wechat' title='微信号：' />
            <ContactRow key='email' title='邮箱：' />
          </div>
        )}
      </div>
    )
  }
}

export default Form.create({ name: 'person' })(Person)