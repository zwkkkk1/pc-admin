import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'
import SearchForm from '../component/search'

@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component {
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
      const { list, getProductList } = this.props
      if (!list || !list.length) {
        getProductList(this.state.args)
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

  handlePageChange = (page) => {
    this.setState(({ args }) => ({
      args: { ...args, pageNo: page }
    }))
  }

  render() {
    const { list: { data, num }, loading } = this.props
    return (
      <div>
        <SearchForm />
        <ProductTable
          data={data}
          loading={loading}
          pagination={{ pageSize: this.state.args.pageSize, onChange: this.handlePageChange, total: num }}
        />
      </div>
    )
  }
}

export default List