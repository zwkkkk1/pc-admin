export const mapStateToProps = () => {
  return {

  }
}

export const mapDispatchToProps = (dispatch) => ({
  productAdd: content => dispatch({ type: 'product/add', payload: { content } })
})
