import React from 'react'
import './style'

export default ({ title, content }) => (
  <div className='modal-line'>
    <span className='modal-title'>{title}</span>
    <span className='modal-content'>{content}</span>
  </div>
)