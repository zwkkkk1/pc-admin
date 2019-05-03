import React from 'react'
import { Table } from 'antd'
import { formatDate } from 'utils'

import './style'

export default class userTable extends React.PureComponent {
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

  render() {
    const { list: { data, num }, loading, onPageChange } = this.props
    return (
      <Table
        className='list'
        dataSource={data}
        pagination={{ pageSize: 7, onChange: onPageChange, total: num }}
        loading={loading}
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