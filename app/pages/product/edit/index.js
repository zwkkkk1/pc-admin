import React from 'react'
import { connect } from 'dva'
import { Loading } from 'components'
import ProductForm from '../component/form'
import { mapStateToProps, mapDispatchToProps } from './connect'

@connect(mapStateToProps, mapDispatchToProps)
class ProductEdit extends React.PureComponent {
  componentDidMount() {
    const { productGet, match: { params } } = this.props
    productGet && productGet(params.id)
  }

  handleSubmit = async (values) => {
    const { productEdit, match: { params } } = this.props
    const result = await productEdit(values, params.id )
    return result
  }

  render() {
    const { loading, itemMap, match: { params } } = this.props
    const item = itemMap[params.id]
    return (
      <div>
        <Loading visible={loading} />
        {item && <ProductForm item={item} handleSubmit={this.handleSubmit} type='edit' />}
      </div>
    )
  }
}

export default ProductEdit