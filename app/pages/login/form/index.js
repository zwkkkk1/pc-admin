import React from 'react'
import { Form, Input, Button, Icon, Checkbox } from 'antd'

import './style'

class myForm extends React.PureComponent {
  componentDidMount() {
    this.props.form.setFieldsValue({
      username: 'zwkkkk1',
      password: '123456'
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { handleSubmit } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
      handleSubmit(values)
    })
  }

  render() {
    const { form: { getFieldDecorator }, btnText } = this.props
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className='login-form-forgot' href=''>Forgot password</a>
          <Button type='primary' htmlType='submit' className='login-form-button'>{btnText}</Button>
          Or <a href=''>register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(myForm)