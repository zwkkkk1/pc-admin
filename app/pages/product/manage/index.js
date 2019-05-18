import React from 'react'
import { connect } from 'dva'
import { Popconfirm } from 'antd'
import { Button, TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { ProductTable, ProductSearch } from '../'

@connect(mapStateToProps, mapDispatchToProps)
class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.tableRef = React.createRef()
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
            renderAction={['edit', 'obtain', (text, { _id }) => (
            <span>
              {level > 1 && (
                <Popconfirm title='确定删除该商品？'  onConfirm={() => this.handleDelete(_id)}>
                  <a>删除</a>
                </Popconfirm>
              )}
            </span>
          )]}
          />}
      </div>
    )
  }
}

export default TableHOC(Manage)