export const mapStateToProps = (state) => {
  const { user: { frontList }, loading } = state
  return {
    frontList,
    loading: !!loading.effects['user/getFrontUserList']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getFrontUserList: (condition) => dispatch({ type: 'user/getFrontUserList', payload: { condition } })
})