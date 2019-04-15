export const mapStateToProps = (state) => {
  const { product: { itemMap }, loading } = state
  return {
    loading: !!loading.effects['product/productGet'],
    itemMap
  }
}

export const mapDispatchToProps = (dispatch) => ({
  productAdd: content => dispatch({ type: 'product/add', payload: { content } }),
  productEdit: (content, id) => dispatch({ type: 'product/edit', payload: { content, id } }),
  productGet: id => dispatch({ type: 'product/productGet', payload: { id } })
})
