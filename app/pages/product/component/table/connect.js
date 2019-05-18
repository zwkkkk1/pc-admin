export const mapStateToProps = (state) => {
  const { product: { list }, loading, user: { collectionMap } } = state
  return {
    list,
    collectionMap,
    loading: !!loading.effects['product/getList']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getList: (condition) => dispatch({ type: 'product/getList', payload: { condition } }),
  productEdit: (content, id) => dispatch({ type: 'product/edit', payload: { content, id } }),
  clearList: () => dispatch({ type: 'product/clearList' }),
  getCollection: () => dispatch({ type: 'user/getCollection' }),
  addCollect: (product) => dispatch({ type: 'user/addCollect', payload: { product } }),
  delCollect: (pid) => dispatch({ type: 'user/delCollect', payload: { pid } })
})

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})