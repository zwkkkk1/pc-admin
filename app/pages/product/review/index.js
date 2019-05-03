import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'

@connect(mapStateToProps, mapDispatchToProps)
class Review extends React.Component {
  render() {
    return (
      <div>
        <ProductTable/>
      </div>
    )
  }
}

export default Review