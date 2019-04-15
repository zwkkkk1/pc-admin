import React from 'react'
import { Table } from 'antd'
import { connect } from 'dva'
import { formatDate } from 'utils'
import { mapStateToProps, mapDispatchToProps } from './connect'

const { Column } = Table

@connect(mapStateToProps, mapDispatchToProps)
class Back extends React.PureComponent {
  componentDidMount() {
    const { getBackUserList } = this.props
    getBackUserList()
  }

  render() {
    const { backList, loading } = this.props
    return (
      <Table
        dataSource={backList}
        pagination={{ pageSize: 7 }}
        loading={loading}
        bordered
      >
        <Column
          title='编号'
          key='index'
          render={(text, record, index) => (<span>{index + 1}</span>)}
        />
        <Column
          title='用户名'
          dataIndex='username'
          key='username'
        />
        <Column
          title='上次登录时间'
          dataIndex='loginAt'
          key='loginAt'
          render={(text) => (<span>{formatDate(text)}</span>)}
        />
        <Column
          title='状态'
          dataIndex='status'
          key='status'
        />
        <Column
          title='操作'
          key='action'
          render={() => (
            <a>冻结</a>
          )}
        />
      </Table>
    )
  }
}

export default Back