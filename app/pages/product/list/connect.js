export const mapStateToProps = (state) => {
  return {

  }
}

export const mapDispatchToProps = (dispatch) => ({
  getCollection: () => dispatch({ type: 'user/getCollection' })
})