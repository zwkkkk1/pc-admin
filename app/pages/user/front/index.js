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
    const { frontList: { data, num }, loading } = this.props
    return (
      <UserTable
        list={data}
        loading={loading}
        pagination={{ pageSize: this.state.args.pageSize, onChange: this.handlePageChange, total: num }}
      />
    )
  }
}

export default Front