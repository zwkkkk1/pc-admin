import React from 'react'
import { connect } from 'dva'
import { Divider, Popconfirm } from 'antd'
import { Button } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'
import SearchForm from '../component/search'

@connect(mapStateToProps, mapDispatchToProps)
class Manage extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => {
      const { list, getProductList, user } = this.props
      if (Object.keys(user).length && !list || !list.length) {
        getProductList({ uid: user._id })
      }
    }, 0)
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  handleChange = (id, status) => {
    const { productEdit, getProductList, user } = this.props
    productEdit({ status: status ? 0 : 1 }, id).then(() => {
      getProductList({ uid: user._id })
    })
  }

  handleDelete = (id) => {
    const { productDelete, getProductList } = this.props
    productDelete(id).then(() => {
      getProductList()
    })
  }

  render() {
    const { list, loading, user: { level } } = this.props
    return (
      <div>
        <Button type='primary' href='/app/product/add'>发布商品</Button>
        <SearchForm />
        {level &&
          <ProductTable
            exclude={['uid']}
            list={list}
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

export default Manage