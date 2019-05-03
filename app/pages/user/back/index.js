import React from 'react'
import { connect } from 'dva'
import { TableHOC } from 'components'
import { mapStateToProps, mapDispatchToProps } from './connect'
import UserTable from '../component/table'

@connect(mapStateToProps, mapDispatchToProps)
class Back extends React.Component {
  render() {
    return (
      <UserTable args={{ type: 'back' }}/>
    )
  }
}

export default TableHOC(Back)