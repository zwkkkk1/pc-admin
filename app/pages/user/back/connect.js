export const mapStateToProps = (state) => {
  return {}
}

export const mapDispatchToProps = (dispatch) => ({
  getList: (condition) => () => dispatch({ type: 'user/getUserList', payload: { condition } }),
  register: user => dispatch({ type: 'user/register', payload: { user, isLogin: false } })
})