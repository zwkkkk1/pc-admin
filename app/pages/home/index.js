import React from 'react'
import { config } from 'utils'
import './style.scss'

const renderSolgan = () => {
  const length = config.solgan.length
  const random = Math.floor(Math.random() * 1000 % length)
  return config.solgan[random]
}

export default class Home extends React.PureComponent {
  render() {
    const solgan = renderSolgan()
    return (
      <div>
        {solgan && <p className='home-solgan'>{solgan}</p>}
      </div>
    )
  }
}