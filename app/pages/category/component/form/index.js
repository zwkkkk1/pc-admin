import React from 'react'
import { Form, Input } from 'antd'

class CategoryForm extends React.PureComponent {
  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item style={{ display: 'none' }}>
          {getFieldDecorator('_id')(<Input />)}
        </Form.Item>
        <Form.Item style={{ display: 'none' }}>
          {getFieldDecorator('parentID')(<Input />)}
        </Form.Item>
        <Form.Item label='类目名称'>
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入类目名称'
            }]
          })(<Input />)}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'category' })(CategoryForm)