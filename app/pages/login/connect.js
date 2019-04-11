export const mapStateToProps = () => ({})

export const mapDispatchToProps = dispatch => ({
  login: user => dispatch({ type: 'user/login', payload: { user } }),
  register: user => dispatch({ type: 'user/register', payload: { user } })
})