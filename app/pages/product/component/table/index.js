import React from 'react'
import { Table } from 'antd'
import { formatPrice } from 'utils'

import './style'

export default class productTable extends React.PureComponent {
  constructor(props) {
    super(props)
    const { exclude, renderAction } = props
    this.state = {
      columns: [{
        title: '编号',
        key: 'index',
        render: (text, record, index) => <span>{index + 1}</span>
      }, {
        title: '商品名称',
        key: 'name',
        dataIndex: 'name'
      }, {
        title: '商品类目',
        dataIndex: 'category',
        key: 'category',
        render: (category) => <span>{category.map(item => item.name).join(' / ')}</span>
      }, {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <span>￥{formatPrice(price)}</span>
      }, {
        title: '预览图',
        dataIndex: 'mainImages',
        key: 'mainImages',
        render: (mainImages, record) => <img className='item-image' src={mainImages[0] || record.images[0]} />
      }, {
        title: '发布者',
        dataIndex: 'uid',
        key: 'uid',
        render: ({ nickname, username }) => <span>{nickname || username}</span>
      }, {
        title: '操作',
        key: 'action',
        render: typeof renderAction !== 'function' ? (text, { _id }) => (
          <a href={`/app/product/edit/${_id}`}>编辑</a>
        ) : (...props) => renderAction(...props)
      }].filter(col => exclude.indexOf(col.key) === -1)
    }
  }

  render() {
    const { data, loading, pagination } = this.props
    return (
      <Table
        className='product-list'
        dataSource={data}
        pagination={pagination}
        loading={loading}
        columns={this.state.columns}
        bordered
      />
    )
  }
}

productTable.defaultProps = {
  data: {
    data: {},
    num: 0
  },
  exclude: [],
  renderAction: null
}