export const mapStateToProps = (state) => {
  const { category: { list } } = state
  return {
    categoryList: list
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getCategoryList: (condition) => dispatch({ type: 'category/getList', payload: { condition } }),
  getProductList: (condition) => dispatch({ type: 'product/getList', payload: { condition } })
})