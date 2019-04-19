export const mapStateToProps = (state) => {
  const { user: { user } } = state
  return {
    user
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getLoginUserInfo: () => dispatch({ type: 'user/getLoginUserInfo' }),
  modifyUserInfo: (content) => dispatch({ type: 'user/modifyUserInfo', payload: { content } })
})