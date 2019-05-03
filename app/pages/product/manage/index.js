import React from 'react'
import { connect } from 'dva'
import { Divider, Popconfirm } from 'antd'
import { Button } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'
import SearchForm from '../component/search'

@connect(mapStateToProps, mapDispatchToProps)
class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      args: {
        pageSize: 7,
        pageNo: 1
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const { list, user } = this.props
      if (Object.keys(user).length && !list || !list.length) {
        this.setState(({ args }) => ({
            args: { ...args, uid: user._id }
          })
        );
      }
    }, 0)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.args !== nextState.args) {
      nextProps.getProductList(nextState.args)
    }
    return true
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  handleChange = (id, status) => {
    const { productEdit, getProductList } = this.props
    productEdit({ status: status ? 0 : 1 }, id).then(() => {
      getProductList(this.state.args)
    })
  }

  handlePageChange = (page) => {
    this.setState(({ args }) => ({
      args: { ...args, pageNo: page }
    }))
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
            data={list}
            loading={loading}
            onPageChange={this.handlePageChange}
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