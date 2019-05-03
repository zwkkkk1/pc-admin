import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { TableHOC } from 'components'
import ProductTable from '../component/table'
import SearchForm from '../component/search'

@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      const { list, getProductList, args } = this.props
      if (!list || !list.length) {
        getProductList(args)
      }
    }, 0)
  }

  componentWillReceiveProps(nextProps) {
    const { getProductList, args } = nextProps
    if (this.props.args !== args) {
      getProductList(args)
    }
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  render() {
    const { list: { data, num }, loading, onPageChange, args } = this.props
    return (
      <div>
        <SearchForm />
        <ProductTable
          data={data}
          loading={loading}
          pagination={{ pageSize: args.pageSize, onChange: onPageChange, total: num }}
        />
      </div>
    )
  }
}

export default TableHOC(List)