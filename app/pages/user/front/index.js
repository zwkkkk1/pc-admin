import React from 'react'
import { connect } from 'dva'
import { TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import UserTable from '../component/table'

@connect(mapStateToProps, mapDispatchToProps)
class Front extends React.Component {
  state = {
    userVisible: false,
    args: { type: 'front' }
  }

  toggleVisible = () => {
    this.setState(prevState => ({
      userVisible: !prevState.userVisible
    }))
  }

  render() {
    const { args } = this.state
    return (
      <div>
        <UserTable
          args={args}
          renderAction={['freeze']}
        />
      </div>
    )
  }
}

export default TableHOC(Front)