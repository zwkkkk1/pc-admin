import React from 'react'
import { connect } from 'dva'
import { Form, Input, Tooltip, Icon, Button, Message, Cascader } from 'antd'
import { PictureWall } from 'components'
import { history } from 'utils'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './style'

const { TextArea } = Input

@connect(mapStateToProps, mapDispatchToProps)
class ProductForm extends React.PureComponent {
  componentDidMount() {
    const { item, form: { setFieldsValue }, getCategoryList } = this.props
    getCategoryList({ level: 1 })
    setFieldsValue(item)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { handleSubmit, form: { validateFieldsAndScroll } } = this.props
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await handleSubmit(values)
        if(result) (
          Message.success('上传成功', 1).then(() => history.replace('/app/product/manage'))
        )
      } else {
        Message.warning(err[Object.keys(err)[0]].errors[0].message, 1)
      }
    });
  }

  render() {
    const { form, form: { getFieldDecorator }, type, categoryList } = this.props
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
        <Form.Item
          label='商品类目'
        >
          {getFieldDecorator('category', {
            rules: [{ type: 'array', required: true, message: '请选择商品类目' }]
          })(
            <Cascader
              placeholder='请选择商品类目'
              options={categoryList}
              fieldNames={{ label: 'name', value: '_id' }}
            />
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              商品图片&nbsp;
              <Tooltip title='请上传小于2MB的PNG或JPG图片'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('mainImages', {
            valuePropName: 'fileList',
            rules: [{
              required: true, message: '请上传至少一张商品主图'
            }]
          })(<PictureWall needInit={type === 'edit'} field='mainImages' number={3} form={form} />)}
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
              图文详情&nbsp;
              <Tooltip title='请上传小于2MB的PNG或JPG图片'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('images', {
            valuePropName: 'fileList'
          })(<PictureWall needInit={type === 'edit'} field='images' number={5} form={form} />)}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type='primary' htmlType='submit'>提交</Button>
          <Button.Preset className='back-btn' type='back' />
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'product' })(ProductForm)