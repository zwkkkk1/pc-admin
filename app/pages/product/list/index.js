import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductTable from '../component/table'
import SearchForm from '../component/search'

@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component {
  render() {
    return (
      <div>
        <SearchForm />
        <ProductTable/>
      </div>
    )
  }
}

export default List