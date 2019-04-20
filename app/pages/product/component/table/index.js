import React from 'react'
import { Table } from 'antd'
import { formatPrice } from 'utils'

import './style'


const { Column } = Table

export default class productTable extends React.PureComponent {
  render() {
    const { list, loading } = this.props
    return (
      <Table
        className='product-list'
        dataSource={list}
        pagination={{ pageSize: 7 }}
        loading={loading}
        bordered
      >
        <Column
          title='编号'
          key='index'
          render={(text, record, index) => <span>{index + 1}</span>}
        />
        <Column
          title='商品名称'
          dataIndex='name'
          key='name'
        />
        <Column
          title='价格'
          dataIndex='price'
          key='price'
          render={(text) => <span>￥{formatPrice(text)}</span>}
        />
        <Column
          title='预览图'
          dataIndex='mainImages'
          key='mainImages'
          render={(images, record) => <img className='item-image' src={images[0] || record.images[0]} />}
        />
        <Column
          title='操作'
          key='action'
          render={(text, record) => (
            <a href={`/app/product/edit/${record._id}`}>编辑</a>
          )}
        />
      </Table>
    )
  }
}