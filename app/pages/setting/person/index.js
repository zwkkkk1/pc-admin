import React from 'react'
import { connect } from 'dva'
import { Form, Button, Message, Input, Tooltip, Icon } from 'antd'
import { AvatarUpload } from 'components'
import { history } from 'utils'
import { mapStateToProps, mapDispatchToProps } from './connect'

@connect(mapStateToProps, mapDispatchToProps)
class Person extends React.PureComponent {
  componentDidMount() {
    const { user, getLoginUserInfo } = this.props
    if (Object.keys(user).length === 0) {
      getLoginUserInfo()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.keys(this.props.user).length && Object.keys(nextProps.user).length) {
      const { form: { setFieldsValue } } = this.props
      setFieldsValue({ ...nextProps.user })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { form: { validateFieldsAndScroll } } = this.props
    validateFieldsAndScroll(async (err, values) => {
      console.log('submit >>> ', values)
      // if (!err) {
      //   Message.success('编辑成功', 1).then(() => history.goBack())
      // } else {
      //   Message.warning(err[Object.keys(err)[0]].errors[0].message, 1)
      // }
    })
  }

  render() {
    const { form: { getFieldDecorator }, user: { avatar } } = this.props
    return (
      <div>
        <h4>个人设置</h4>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
        <Form.Item label='用户名'>
          {getFieldDecorator('username')(<Input />)}
        </Form.Item>
        <Form.Item label='昵称'>
          {getFieldDecorator('nickname')(<Input />)}
        </Form.Item>
        <Form.Item label='性别'>
          {getFieldDecorator('sex')(<Input />)}
        </Form.Item>
        <Form.Item
          label={(
            <span>用户等级&nbsp;
              <Tooltip title='价格以分为单位'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('level')(<Input />)}
        </Form.Item>
        <Form.Item label='头像'>
          {getFieldDecorator('avatar')(<AvatarUpload imageUrl={avatar} />)}
        </Form.Item>
        <Form.Item label='个性签名'>
          {getFieldDecorator('sign')(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type='primary' htmlType='submit'>提交</Button>
          <Button.Preset className='back-btn' type='back' />
        </Form.Item>
      </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'person' })(Person)