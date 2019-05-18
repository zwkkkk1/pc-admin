import React from 'react'
import { Button } from 'antd'
import { connect } from 'dva'
import { TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import UserTable from '../component/table'
import UserModal from './UserModal'

@connect(mapStateToProps, mapDispatchToProps)
class Back extends React.Component {
  state = {
    userVisible: false,
    args: { type: 'back' }
  }

  toggleVisible = () => {
    this.setState(prevState => ({
      userVisible: !prevState.userVisible
    }))
  }

  render() {
    const { userVisible, args } = this.state
    const { register, getList } = this.props
    return (
      <div>
        <Button type='primary' onClick={this.toggleVisible}>新增管理员</Button>
        <UserTable
          args={args}
          renderAction={['freeze']}
        />
        <UserModal visible={userVisible} getList={getList(args)} handleCancel={this.toggleVisible} register={register} />
      </div>
    )
  }
}

export default TableHOC(Back)