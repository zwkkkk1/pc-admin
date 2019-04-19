import React from 'react'
import { connect } from 'dva'
import { Form, Button, Message, Input, Tooltip, Icon, Radio } from 'antd'
import { PictureWall } from 'components'
import { history } from 'utils'
import { mapStateToProps, mapDispatchToProps } from './connect'

const userTypeEnum = {
  1: '普通用户',
  2: '管理员',
  3: '超级管理员'
}

@connect(mapStateToProps, mapDispatchToProps)
class Person extends React.PureComponent {
  componentDidMount() {
    const { user, getLoginUserInfo } = this.props
    if (Object.keys(user).length === 0) {
      getLoginUserInfo()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps
    if (!Object.keys(this.props.user).length && Object.keys(user).length) {
      const { form: { setFieldsValue } } = this.props
      setFieldsValue(user)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { form: { validateFieldsAndScroll }, modifyUserInfo } = this.props
    validateFieldsAndScroll(async (err, values) => {
      console.log('submit >>> ', values)
      if (!err) {
        const result = await modifyUserInfo(values)
        if (result) {
          Message.success('编辑成功', 1).then(() => history.goBack())
        }
      } else {
        Message.warning(err[Object.keys(err)[0]].errors[0].message, 1)
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, form, user: { level } } = this.props
    return (
      <div>
        <h4>个人设置</h4>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
        <Form.Item label='用户名'>
          {getFieldDecorator('username')(<Input disabled />)}
        </Form.Item>
        <Form.Item label='昵称'>
          {getFieldDecorator('nickname')(<Input />)}
        </Form.Item>
        <Form.Item label='性别'>
          {getFieldDecorator('sex')(
            <Radio.Group>
              <Radio value={1}><Icon type='man' style={{ fontSize: 20, color: '#A6D8F9' }} /></Radio>
              <Radio value={0}><Icon type='woman' style={{ fontSize: 20, color: '#EF7AA7' }} /></Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='用户类型'>
          {getFieldDecorator('level')(<p>{userTypeEnum[level]}</p>)}
        </Form.Item>
        <Form.Item label='头像'>
          {getFieldDecorator('avatar', {
            valuePropName: 'fileList'
          })(<PictureWall form={form} field='avatar' number={1} needInit />)}
        </Form.Item>
        <Form.Item label='个性签名'>
          {getFieldDecorator('sign')(<Input placeholder='说点啥吧~~~' />)}
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