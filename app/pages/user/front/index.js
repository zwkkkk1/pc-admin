import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { TableHOC } from 'components'
import UserTable from '../component/table'

@connect(mapStateToProps, mapDispatchToProps)
class Front extends React.Component {
  componentDidMount() {
    const { getUserList, args } = this.props
    getUserList(args)
  }

  componentWillReceiveProps(nextProps) {
    const { getUserList, args } = nextProps
    if (this.props.args !== args) {
      getUserList(args)
    }
  }

  render() {
    const { list: { data, num }, loading, onPageChange, args } = this.props
    return (
      <UserTable
        list={data}
        loading={loading}
        pagination={{ pageSize: args.pageSize, onChange: onPageChange, total: num }}
      />
    )
  }
}

export default TableHOC(Front)