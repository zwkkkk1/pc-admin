export const mapStateToProps = (state) => {
  const { product: { list }, loading } = state
  return {
    list,
    loading: !!loading.effects['product/getList']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getList: (condition) => dispatch({ type: 'product/getList', payload: { condition } }),
  clearList: () => dispatch({ type: 'product/clearList' })
})

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})