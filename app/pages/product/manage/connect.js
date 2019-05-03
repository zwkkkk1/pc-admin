export const mapStateToProps = (state) => {
  const { user: { user } } = state
  return {
    user
  }
}

export const mapDispatchToProps = (dispatch) => ({
  productEdit: (content, id) => dispatch({ type: 'product/edit', payload: { content, id } }),
  productDelete: (id) => dispatch({ type: 'product/delete', payload: { id } })
})