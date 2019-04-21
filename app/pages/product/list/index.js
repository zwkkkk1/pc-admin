import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'
import SearchForm from '../component/search'

@connect(mapStateToProps, mapDispatchToProps)
class List extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => {
      const { list, getProductList } = this.props
      if (!list || !list.length) {
        getProductList()
      }
    }, 0)
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  render() {
    const { list, loading } = this.props
    return (
      <div>
        <SearchForm />
        <ProductTable list={list} loading={loading} />
      </div>
    )
  }
}

export default List