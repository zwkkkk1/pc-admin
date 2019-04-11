export const mapStateToProps = () => ({})

export const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: 'user/logout' })
})