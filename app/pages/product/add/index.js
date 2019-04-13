import React from 'react'
import { connect } from 'dva'
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import { PictureWall } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './style'

const { TextArea } = Input

const fileList = [{
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }]

@connect(mapStateToProps, mapDispatchToProps)
class ProductAdd extends React.PureComponent {
  componentDidMount() {
    this.props.form.setFieldsValue({
      name: 'zwkkkk1',
      price: '14'
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  // handleChange = (config) => {
  //   const { fileList } = config
  //   return fileList.map(file => ({
  //     status: file.status,
  //     uid: file.uid,
  //     url: file.response ? file.response.data.url : file.url
  //   }));
  // }

  render() {
    const { form, form: { getFieldDecorator } } = this.props
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
        <Form.Item label='商品价格'>
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
              <Tooltip title='请上传小于50MB的PNG或JPG图片'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('images', {
            valuePropName: 'fileList',
            // getValueFromEvent: this.handleChange,
            rules: [{
              required: true, message: '请上传至少一张商品图片'
            }]
          })(<PictureWall number={3} form={form} list={fileList} />)}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type='primary' htmlType='submit'>添加</Button>
          <Button className='back-btn'>返回</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'add' })(ProductAdd)