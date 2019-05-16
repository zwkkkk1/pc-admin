export const mapStateToProps = (state) => {
  const { user: { collection } } = state
  return {
    collection
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getCollection: () => dispatch({ type: 'user/getCollection' })
})