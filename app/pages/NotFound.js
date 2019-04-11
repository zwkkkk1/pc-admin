import React from 'react'
import NotFoundImage from 'images/404.png'

import './style'

export default class NotFound extends React.PureComponent {
  state = {
    animated: ''
  }

  enter = () => {
    this.setState({ animated: 'hinge' })
  }

  render() {
    return (
      <div className='notfound-wrapper'>
        <img src={NotFoundImage}
          alt='404'
          className={`animated swing ${this.state.animated}`}
          onMouseEnter={this.enter}
        />
      </div>
    )
  }
}