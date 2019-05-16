import React from 'react'

class Image extends React.PureComponent {
  render() {
    const { style, src, ...restProps } = this.props
    const { width, height } = style
    return (
      <img
        {...restProps}
        style={style}
        src={`${src}?x-oss-process=image/resize,h_${height.replace(/px/, '')},w_${width.replace(/px/, '')}`}
      />
    )
  }
}

export default Image