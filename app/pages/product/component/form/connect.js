export const mapStateToProps = (state) => {
  const { category: { list } } = state
  return {
    categoryList: list
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getCategoryList: (condition) => dispatch({ type: 'category/getList', payload: { condition } })
})