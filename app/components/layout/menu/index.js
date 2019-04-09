import React from 'react'
import { Menu, Icon } from 'antd';
import './style'

const SubMenu = Menu.SubMenu;

export default class myMenu extends React.Component {
  renderItem(item, subMenuName = '', index) {
    const { handleClickMenu } = this.props
    const { icon, name, children, link } = item
    if (!children || !children.length) { return (
      <Menu.Item key={link} onClick={handleClickMenu.bind(this, item, subMenuName)}>
        {icon && <Icon type={icon} />}
        <span>{name}</span>
      </Menu.Item>
    )}
    return (
      <SubMenu
        title={<span><Icon type={icon}/><span>{name}</span></span>}
        key={`sub_${index}`}
      >
        { children.map((child) => (
          this.renderItem(child, name)
        ))}
      </SubMenu>
    )
  }

  render() {
    const { map } = this.props
    return (
      <Menu theme="dark" mode="inline">
        {map.map((item, index) => this.renderItem(item, '', index))}
      </Menu>
    )
  }
}
