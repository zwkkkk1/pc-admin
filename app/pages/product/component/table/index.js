import React from 'react'
import { connect } from 'dva'
import { Table, Tooltip, Icon } from 'antd'
import { TableHOC, ProductModal } from 'components'
import { formatPrice, enumPreset } from 'utils'
import { mapStateToProps, mapDispatchToProps, mergeProps } from './connect'

import './style'

class productTable extends React.PureComponent {
  constructor(props) {
    super(props)
    const { exclude } = props
    this.state = {
      productVisible: false,
      item: null,
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
        render: (category) => <span>{category.map(item => item.name || item).join(' / ')}</span>
      }, {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <span>￥{formatPrice(price)}</span>
      }, {
        title: '预览图',
        dataIndex: 'mainImages',
        key: 'mainImages',
        render: (mainImages, { images }) => <img className='item-image' src={mainImages[0] || images || images[0] || ''} />
      }, {
        title: '发布者',
        dataIndex: 'uid',
        key: 'uid',
        render: ({ nickname, username }, { username: name }) => <span>{nickname || username || name}</span>
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status, { extra }) => (
          <span>
            <span style={{ marginRight: 4 }}>{enumPreset.productStatus[status]}</span>
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
        render: (...props) => this.renderAction(...props)
      }].filter(col => exclude.indexOf(col.key) === -1)
    }
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  toggleVisible = (key, item = null) => () => {
    this.setState(prevState => ({
      item,
      [key]: !prevState[key]
    }))
  }

  handleChange = (id, status) => {
    const { productEdit, getList, args } = this.props
    productEdit({ status: status ? 0 : 1 }, id).then(() => getList(args))
  }

  // 渲染操作列
  renderAction = (text, record) => {
    const { renderAction, collectionMap, addCollect, delCollect, getCollection } = this.props
    const { _id, status } = record
    const actionMap = {
      edit: (<a href={`/app/product/edit/${_id}`}>编辑</a>),
      view: (<a onClick={this.toggleVisible('productVisible', record)}>查看</a>),
      obtain: (<a onClick={() => this.handleChange(_id, status)}>{status ? '下架' : '上架'}</a>),
      collect: (
        Object.keys(collectionMap.data).indexOf(record._id) !== -1 ? (
          <a onClick={() => delCollect(record._id).then(() => getCollection())}>取消收藏</a>
        ) : (
          <a onClick={() => addCollect(record).then(() => getCollection())}>收藏</a>
        )
      )
    }
    return renderAction(actionMap)(text, record)
  }

  render() {
    const { list: { data, num }, loading, onPageChange, args } = this.props
    const { item, productVisible, columns } = this.state
    return (
      <div>
        <Table
          className='product-list'
          dataSource={data}
          loading={loading}
          columns={columns}
          pagination={{ pageSize: args.pageSize, onChange: onPageChange, total: num }}
          bordered
        />
        {item && <ProductModal visible={productVisible} handleOk={this.toggleVisible('productVisible')} item={item} />}
      </div>
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