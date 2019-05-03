import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import UserTable from '../component/table'

@connect(mapStateToProps, mapDispatchToProps)
class Front extends React.Component {
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
    const { getFrontUserList } = this.props
    getFrontUserList(this.state.args)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.args !== nextState.args) {
      nextProps.getProductList(nextState.args)
    }
    return true
  }

  handlePageChange = (page) => {
    this.setState(({ args }) => ({
      args: { ...args, pageNo: page }
    }))
  }

  render() {
    const { frontList, loading } = this.props
    return (
      <UserTable list={frontList} loading={loading} onPageChange={this.handlePageChange} />
    )
  }
}

export default Front