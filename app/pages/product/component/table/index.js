import React from 'react'
import { connect } from 'dva'
import { Table, Tooltip, Icon } from 'antd'
import { TableHOC } from 'components'
import { formatPrice, formatStatus } from 'utils'
import { mapStateToProps, mapDispatchToProps, mergeProps } from './connect'

import './style'

class productTable extends React.PureComponent {
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
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status, { extra }) => (
          <span>
            <span style={{ marginRight: 4 }}>{formatStatus(status)}</span>
            {Number(status) === -2 && (
              <Tooltip title={extra}>
                <Icon type='question-circle-o' />
              </Tooltip>
            )}
          </span>
        )
      }, {
        title: '操作',
        key: 'action',
        render: typeof renderAction !== 'function' ? (text, { _id }) => (
          <a href={`/app/product/edit/${_id}`}>编辑</a>
        ) : (...props) => renderAction(...props)
      }].filter(col => exclude.indexOf(col.key) === -1)
    }
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  render() {
    const { list: { data, num }, loading, onPageChange, args } = this.props
    return (
      <Table
        className='product-list'
        dataSource={data}
        loading={loading}
        columns={this.state.columns}
        pagination={{ pageSize: args.pageSize, onChange: onPageChange, total: num }}
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(TableHOC(productTable))