import React from 'react'
import { Table } from 'antd'
import { connect } from 'dva'
import { formatDate } from 'utils'
import { TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps, mergeProps } from './connect'

import './style'

class userTable extends React.PureComponent {
  constructor(props) {
    super(props)
    const { exclude, renderAction } = props
    this.state = {
      columns: [{
        title: '编号',
        key: 'index',
        render: (text, record, index) => <span>{index + 1}</span>
      }, {
        title: '用户名',
        key: 'username',
        dataIndex: 'username'
      }, {
        title: '上次登录时间',
        dataIndex: 'loginAt',
        key: 'loginAt',
        render: (text) => <span>{formatDate(text)}</span>
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      }, {
        title: '操作',
        key: 'action',
        render: () => (
          <a>冻结</a>
        )
      }].filter(col => exclude.indexOf(col.key) === -1)
    }
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  render() {
    const { list: { data, num }, loading, onPageChange, args } = this.props
    return (
      <Table
        className='list'
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: args.pageSize, onChange: onPageChange, total: num }}
        columns={this.state.columns}
        bordered
      />
    )
  }
}

userTable.defaultProps = {
  exclude: [],
  renderAction: null
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TableHOC(userTable))