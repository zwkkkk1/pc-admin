export const mapStateToProps = (state) => {
  const { user: { user } } = state
  return {
    user
  }
}

export const mapDispatchToProps = (dispatch) => ({
  productDelete: (id) => dispatch({ type: 'product/delete', payload: { id } })
})