export const mapStateToProps = (state) => {
  const { user: { user } } = state
  return {
    user
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getLoginUserInfo: () => dispatch({ type: 'user/getLoginUserInfo' })
})