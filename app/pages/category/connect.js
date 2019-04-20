export const mapStateToProps = (state) => {
  const { category: { list } } = state
  return {
    list
  }
}

export const mapDispatchToProps = (dispatch) => ({
  CategoryAdd: (content) => dispatch({ type: 'category/add', payload: { content } }),
  CategoryDelete: (id) => dispatch({ type: 'category/delete', payload: { id } }),
  getCategoryList: (condition) => dispatch({ type: 'category/getList', payload: { condition } })
})