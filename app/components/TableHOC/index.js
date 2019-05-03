import React from 'react'

export default (WrappedComponent) => (
  class TableHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        args: {
          ...props.args,
          pageSize: 7,
          pageNo: 1
        }
      }
    }

    componentDidMount() {
      setTimeout(() => {
        const { list, getList } = this.props
        if (!list || !list.length) {
          getList(this.state.args)
        }
      }, 0)
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.args !== nextState.args) {
        nextProps.getList(nextState.args)
      }
      return true
    }

    getList = async (args) => {
      const { getList } = this.props
      getList({ ...this.state.args, ...args })
    }

    changeArgs = (params) => {
      this.setState(params)
    }

    handlePageChange = (page) => {
      this.setState(({ args }) => ({
        args: { ...args, pageNo: page }
      }))
    }

    render = () => {
      return (
      <WrappedComponent
        {...this.props}
        changeArgs={this.changeArgs}
        args={this.state.args}
        onPageChange={this.handlePageChange}
      />)
    }
  }
)