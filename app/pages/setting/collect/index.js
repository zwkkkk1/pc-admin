import React from 'react'
import { connect } from 'dva'
import { Form, Button, Message, Input, Tooltip, Icon, Radio } from 'antd'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { ProductTable } from '../../product'

@connect(mapStateToProps, mapDispatchToProps)
class Collect extends React.PureComponent {
  componentDidMount() {
    const { getCollection } = this.props
    getCollection()
  }
  render() {
    const { collection } = this.props
    return (
      <div>
        <h4>我的收藏</h4>
        <ProductTable
          list={collection}
        />
      </div>
    )
  }
}

export default Collect