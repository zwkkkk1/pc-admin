export const mapStateToProps = (state) => {
  const { product: { list }, loading, user: { user } } = state
  return {
    list,
    user,
    loading: !!loading.effects['product/getList']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getProductList: (condition) => dispatch({ type: 'product/getList', payload: { condition } }),
  productEdit: (content, id) => dispatch({ type: 'product/edit', payload: { content, id } }),
  productDelete: (id) => dispatch({ type: 'product/delete', payload: { id } }),
  clearList: () => dispatch({ type: 'product/clearList' })
})