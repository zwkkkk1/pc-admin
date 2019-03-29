import React from 'react'
import { Menu, Icon } from 'antd';
import './style'

const SubMenu = Menu.SubMenu;

export default class myMenu extends React.Component {
  renderItem(item, subMenuName = '') {
    const { handleClickMenu } = this.props
    const { icon, name, children } = item
    if (!children || !children.length) { return (
      <Menu.Item onClick={handleClickMenu.bind(this, item, subMenuName)}>
        {icon && <Icon type={icon} />}
        <span>{name}</span>
      </Menu.Item>
    )}
    return (
      <SubMenu
        title={<span><Icon type={icon}/><span>{name}</span></span>}
      >
        { children.map((child, index) => (
          this.renderItem(child, name, index)
        ))}
      </SubMenu>
    )
  }

  render() {
    const { map } = this.props
    return (
      <Menu theme="dark" mode="inline">
        {map.map(item => this.renderItem(item))}
      </Menu>
    )
  }
}
