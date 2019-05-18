import React from 'react'
import { Table } from 'antd'
import { connect } from 'dva'
import { formatDate, enumPreset } from 'utils'
import { TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps, mergeProps } from './connect'

import './style'

class userTable extends React.PureComponent {
  constructor(props) {
    super(props)
    const { exclude } = props
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
        key: 'status',
        render: (status) => <span>{enumPreset.userStatus[status]}</span>
      }, {
        title: '操作',
        key: 'action',
        render: (...props) => this.renderAction(...props)
      }].filter(col => exclude.indexOf(col.key) === -1)
    }
  }

  componentWillUnmount = async () => {
    await this.props.clearList()
  }

  handleFreeze = (status, id) => () => {
    const { userEdit, getList, args } = this.props
    userEdit({ status: status ? 0 : 1 }, id).then(() => getList(args))
  }

  // 渲染操作列
  renderAction = (text, record) => {
    const { renderAction } = this.props
    const { status, _id } = record
    const actionMap = {
      freeze: (<a onClick={this.handleFreeze(status, _id)}>{status ? '冻结' : '取消冻结'}</a>)
    }
    return renderAction(actionMap)(text, record)
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