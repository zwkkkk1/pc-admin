export const mapStateToProps = () => {
  return {

  }
}

export const mapDispatchToProps = (dispatch) => ({
  getCollection: () => dispatch({ type: 'user/getCollection' })
})