import React from 'react'

export default class Category extends React.PureComponent {
  render() {
    console.log('category render >>> ', this.props)
    return (<div>类目管理</div>)
  }
}