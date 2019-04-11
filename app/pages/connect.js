export const mapStateToProps = (state) => {
  const { user: { user }, loading } = state
  return {
    user,
    loading: !!loading.effects['user/getLoginUserInfo'] || !!loading.effects['user/login']
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getLoginUserInfo: () => dispatch({ type: 'user/getLoginUserInfo' })
})