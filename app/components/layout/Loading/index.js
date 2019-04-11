import React from 'react'
import { Spin, Icon } from 'antd'
import { CSSTransition } from 'react-transition-group'

import './style'

class Loading extends React.PureComponent {
  render() {
    const { visible, size = 36, timeout = 300 } = this.props
    return (
      <CSSTransition
        in={visible}
        timeout={timeout}
        classNames='fade'
      >
        <div className='loading-wrapper'>
          <Spin indicator={
            <Icon type='loading'
              style={{ fontSize: size }}
            />}
          />
        </div>
      </CSSTransition>
    )
  }
}

export default Loading