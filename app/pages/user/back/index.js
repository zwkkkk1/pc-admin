import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import UserTable from '../component/table'

@connect(mapStateToProps, mapDispatchToProps)
class Back extends React.Component {
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
    const { getBackUserList } = this.props
    getBackUserList(this.state.args)
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
    const { backList, loading } = this.props
    return (
      <UserTable list={backList} loading={loading} onPageChange={this.handlePageChange} />
    )
  }
}

export default Back