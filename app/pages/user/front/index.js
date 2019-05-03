import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { TableHOC } from 'components'
import UserTable from '../component/table'

@connect(mapStateToProps, mapDispatchToProps)
class Front extends React.Component {
  render() {
    return (
      <UserTable args={{ type: 'front' }}/>
    )
  }
}

export default TableHOC(Front)