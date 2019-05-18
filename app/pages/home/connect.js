export const mapStateToProps = (state) => {
  const { user: { user, count } } = state
  return {
    user,
    count
  }
}

export const mapDispatchToProps = (dispatch) => ({
})