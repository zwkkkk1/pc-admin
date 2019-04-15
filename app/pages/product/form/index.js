import React from 'react'
import { Form, Input, Tooltip, Icon, Button, Message } from 'antd'
import { PictureWall } from 'components'
import { history } from 'utils'

import './style'

const { TextArea } = Input

class ProductForm extends React.PureComponent {
  componentDidMount() {
    const { item } = this.props
    if (item) {
      this.props.form.setFieldsValue(item)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { handleSubmit, form: { validateFieldsAndScroll } } = this.props
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await handleSubmit(values)
        if(result) (
          Message.success('编辑成功', 1).then(() => history.replace('/app/product/manage'))
        )
      } else {
        Message.warning(err[Object.keys(err)[0]].errors[0].message, 1)
      }
    });
  }

  render() {
    const { form, form: { getFieldDecorator }, btnText, item } = this.props
    return (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item label='商品名称'>
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入商品名称'
            }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='商品描述'>
          {getFieldDecorator('desc')(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        <Form.Item
          label={(
            <span>商品价格&nbsp;
              <Tooltip title='价格以分为单位'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('price', {
            rules: [{
              required: true, message: '请输入商品价格'
            }]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              商品图片&nbsp;
              <Tooltip title='请上传小于4MB的PNG或JPG图片'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('images', {
            valuePropName: 'fileList',
            rules: [{
              required: true, message: '请上传至少一张商品图片'
            }]
          })(<PictureWall number={3} form={form} list={item && item.images || []} />)}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type='primary' htmlType='submit'>{btnText}</Button>
          <Button.Preset className='back-btn' type='back' />
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'product' })(ProductForm)