export const mapStateToProps = (state) => {
  const { user: { list }, loading } = state
  return {
    list,
    loading: !!loading.effects['user/getUserList']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getList: (condition) => dispatch({ type: 'user/getUserList', payload: { condition } }),
  clearList: () => dispatch({ type: 'user/clearList' })
})

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})