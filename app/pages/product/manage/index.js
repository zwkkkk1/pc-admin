import React from 'react'
import { connect } from 'dva'
import { Divider, Popconfirm } from 'antd'
import { Button, TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { ProductTable, ProductSearch } from '../'

@connect(mapStateToProps, mapDispatchToProps)
class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.tableRef = React.createRef()
  }

  handleChange = (id, status) => {
    const { productEdit } = this.props
    productEdit({ status: status ? 0 : 1 }, id).then(() => {
      this.tableRef.current.getWrappedInstance().getList()
    })
  }

  handleDelete = (id) => {
    const { productDelete } = this.props
    productDelete(id).then(() => {
      this.tableRef.current.getWrappedInstance().getList()
    })
  }

  render() {
    const { user: { level, _id }, history } = this.props
    return (
      <div>
        <Button type='primary' onClick={() => history.push('/app/product/add')}>发布商品</Button>
        <ProductSearch />
        {level &&
          <ProductTable
            ref={this.tableRef}
            args={{ uid: _id }}
            exclude={['uid']}
            renderAction={(text, { _id, status }) => (
            <span>
              <a onClick={() => history.push(`/app/product/edit/${_id}`)}>编辑</a>
              <Divider type='vertical' />
              <a onClick={() => this.handleChange(_id, status)}>{status ? '下架' : '上架'}</a>
              {level > 1 && (
                <span>
                  <Divider type='vertical' />
                  <Popconfirm title='确定删除该商品？'  onConfirm={() => this.handleDelete(_id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              )}
            </span>
          )}
          />}
      </div>
    )
  }
}

export default TableHOC(Manage)