export const mapStateToProps = (state) => {
  const { user: { list }, loading } = state
  return {
    list,
    loading: !!loading.effects['user/getUserList']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getUserList: (condition) => dispatch({ type: 'user/getUserList', payload: { condition: { ...condition, type: 'front' } } })
})