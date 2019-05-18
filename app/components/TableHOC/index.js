import React from 'react'
import { Divider } from 'antd'

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
      return getList({ ...this.state.args, ...args })
    }

    changeArgs = (params) => {
      this.setState(params)
    }

    handlePageChange = (page) => {
      this.setState(({ args }) => ({
        args: { ...args, pageNo: page }
      }))
    }

      // 渲染操作列
    renderAction = (actionMap) => (...props) => {
      const { renderAction } = this.props
      if (typeof renderAction === 'function') {
        return renderAction(...props)
      } else if (renderAction instanceof Array) {
        return (
          renderAction.map((action, index, array) => (
            <span key={index}>
              {typeof action === 'function' ? action(...props) : (
                Object.keys(actionMap).indexOf(action) !== -1 ? actionMap[action] : <span>{action}</span>
              )}
              {index < array.length -1 && <Divider type='vertical' />}
            </span>
          ))
        )
      }
    }

    render = () => (
      <WrappedComponent
        {...this.props}
        changeArgs={this.changeArgs}
        args={this.state.args}
        onPageChange={this.handlePageChange}
        renderAction={this.renderAction}
      />)
    }
)