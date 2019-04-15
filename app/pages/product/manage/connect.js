export const mapStateToProps = (state) => {
  const { product: { list }, loading } = state
  return {
    list,
    loading: !!loading.effects['product/getList']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getProductList: () => dispatch({ type: 'product/getList' })
})