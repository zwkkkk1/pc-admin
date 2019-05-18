import React from 'react'
import { Form, Modal, Input, Message } from 'antd'

class UserModal extends React.PureComponent {
  state = {
    confirmLoading: false
  }

  handleOk = () => {
    const { form: { validateFields }, register, handleCancel, getList } = this.props
    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        const result = await register({ ...values, level: 2 })
        if (result) {
          Message.success('新增管理员成功', 1)
            .then(() => handleCancel())
            .then(() => getList())
        }
        this.setState({ confirmLoading: false })
      } else {
        Message.warning(err[Object.keys(err)[0]].errors[0].message, 1)
      }
    });
  }

  handleCancel = () => {
    const { handleCancel, form: { resetFields } } = this.props
    handleCancel()
    resetFields()
  }

  render () {
    const { form: { getFieldDecorator }, visible } = this.props
    const { confirmLoading } = this.state
    return (
      <Modal
        title='类目管理'
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        cancelText='取消'
        okText='确定'
        keyboard
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label='用户名称：'>
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入用户名称'
              }]
            })(<Input placeholder='请输入用户名称' />)}
          </Form.Item>
          <Form.Item label='用户密码：'>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入用户密码'
              }]
            })(<Input.Password placeholder='请输入用户密码' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'user' })(UserModal)