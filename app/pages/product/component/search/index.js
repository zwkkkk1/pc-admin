import React from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './style'

@connect(mapStateToProps, mapDispatchToProps)
class SearchForm extends React.PureComponent {
  componentDidMount() {
    const { getCategoryList, categoryList } = this.props
    if (!categoryList || !categoryList.length) {
      getCategoryList({ level: 1 })
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { form: { validateFields }, getProductList, args } = this.props
    validateFields((err, values) => {
      if (!err) {
        getProductList({  ...values, ...args })
      }
    });
  }

  handleReset = () => {
    const { form: { resetFields }, getProductList, args } = this.props
    resetFields();
    getProductList(args)
  }

  render() {
    const { form: { getFieldDecorator }, categoryList } = this.props
    return (
      <Form
        className='ant-advanced-search-form'
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label='商品名称'
            >
              {getFieldDecorator('name')(<Input />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='商品类目'
            >
              {getFieldDecorator('category')(
                <Cascader
                  placeholder='请选择商品类目'
                  options={categoryList}
                  fieldNames={{ label: 'name', value: '_id' }}
                  changeOnSelect
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit'>搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: 'product_form' })(SearchForm)