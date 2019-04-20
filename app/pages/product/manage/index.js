import React from 'react'
import { connect } from 'dva'
import { Button } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'

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

  componentWillReceiveProps(nextProps) {
    if (!Object.keys(this.props.user).length && Object.keys(nextProps.user).length) {
      const { list, getProductList, user } = nextProps
      if (!list || !list.length) {
        getProductList({ uid: user._id })
      }
    }
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  render() {
    const { list, loading } = this.props
    return (
      <div>
        <Button type='primary' href='/app/product/add'>发布商品</Button>
        <ProductTable list={list} loading={loading} />
      </div>
    )
  }
}

export default Manage