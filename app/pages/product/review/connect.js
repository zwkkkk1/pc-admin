export const mapStateToProps = () => {
  return {
  }
}

export const mapDispatchToProps = (dispatch) => ({
  productEdit: (content, id) => dispatch({ type: 'product/edit', payload: { content, id } })
})