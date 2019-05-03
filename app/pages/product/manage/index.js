import React from 'react'
import { connect } from 'dva'
import { Divider, Popconfirm } from 'antd'
import { Button, TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'
import SearchForm from '../component/search'

@connect(mapStateToProps, mapDispatchToProps)
class Manage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      const { list, user, changeArgs } = this.props
      if (Object.keys(user).length && !list || !list.length) {
        changeArgs(({ args }) => ({
            args: { ...args, uid: user._id }
          })
        );
      }
    }, 0)
  }

  componentWillReceiveProps = (nextProps) => {
    const { args, getProductList } = nextProps
    if (this.props.args !== args) {
      getProductList(args)
    }
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  handleChange = (id, status) => {
    const { productEdit, getProductList, args } = this.props
    productEdit({ status: status ? 0 : 1 }, id).then(() => {
      getProductList(args)
    })
  }

  handleDelete = (id) => {
    const { productDelete, getProductList, args } = this.props
    productDelete(id).then(() => {
      getProductList(args)
    })
  }

  render() {
    const { list: { data, num }, loading, user: { level }, args, onPageChange } = this.props
    return (
      <div>
        <Button type='primary' href='/app/product/add'>发布商品</Button>
        <SearchForm />
        {level &&
          <ProductTable
            exclude={['uid']}
            data={data}
            loading={loading}
            pagination={{ pageSize: args.pageSize, onChange: onPageChange, total: num }}
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