import React from 'react'
import { connect } from 'dva'
import { mapStateToProps, mapDispatchToProps } from './connect'
import ProductForm from '../component/form'

@connect(mapStateToProps, mapDispatchToProps)
class ProductAdd extends React.PureComponent {
  handleSubmit = async (values) => {
    const { productAdd } = this.props
    const result = await productAdd(values)
    return result
  }

  render() {
    return (
      <ProductForm type='add' handleSubmit={this.handleSubmit} />
    )
  }
}

export default ProductAdd