import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { ProductTable, ProductSearch } from '../'

@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component {
  componentDidMount = async () => {
    const { getCollection } = this.props
    await getCollection()
  }

  render() {
    return (
      <div>
        <ProductSearch args={{ status: 1 }} />
        <ProductTable
          exclude={['status']}
          ref={this.tableRef}
          args={{ status: 1 }}
          renderAction={['view', 'collect']}
        />
      </div>
    )
  }
}

export default List