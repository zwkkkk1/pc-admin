export const mapStateToProps = (state) => {
  const { user: { backList }, loading } = state
  return {
    backList,
    loading: !!loading.effects['user/getBackUserList']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getBackUserList: () => dispatch({ type: 'user/getBackUserList' })
})