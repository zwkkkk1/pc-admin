import React from 'react'

export default (WrappedComponent) => (
  class TableHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        args: {
          pageSize: 7,
          pageNo: 1
        }
      }
    }

    changeArgs = (params) => {
      this.setState(params)
    }

    handlePageChange = (page) => {
      this.setState(({ args }) => ({
        args: { ...args, pageNo: page }
      }))
    }

    render = () => (
      <WrappedComponent
        {...this.props}
        changeArgs={this.changeArgs}
        args={this.state.args}
        onPageChange={this.handlePageChange}
      />
    )
  }
)