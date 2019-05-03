import React from 'react'
import { connect } from 'dva'
import { Divider, Popconfirm } from 'antd'
import { Button, TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'
import SearchForm from '../component/search'

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
    const { loading, user: { level, _id } } = this.props
    return (
      <div>
        <Button type='primary' href='/app/product/add'>发布商品</Button>
        <SearchForm />
        {level &&
          <ProductTable
            ref={this.tableRef}
            args={{ uid: _id }}
            exclude={['uid']}
            loading={loading}
            renderAction={(text, { _id, status }) => (
            <span>
              <a href={`/app/product/edit/${_id}`}>编辑</a>
              <Divider type='vertical' />
              {level > 1 ? (
                <Popconfirm title='确定删除该商品？'  onConfirm={() => this.handleDelete(_id)}>
                  <a>删除</a>
                </Popconfirm>
              ) : (
                <a onClick={() => this.handleChange(_id, status)}>{status ? '下架' : '上架'}</a>
              )}
            </span>
          )}
          />}
      </div>
    )
  }
}

export default TableHOC(Manage)