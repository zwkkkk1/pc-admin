import React from 'react'
import { Button } from 'antd'
import { history } from 'utils'

Button.Preset = (props) => {
  const { type, ...restProps } = props
  if (type === 'back') {
    return (
      <Button {...restProps} onClick={history.goBack}>返回</Button>
    )
  } else {
    return <Button {...props} />
  }
}

export default Button