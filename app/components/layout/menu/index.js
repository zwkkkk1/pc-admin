import React from 'react'
import { Menu, Icon } from 'antd';
import { history } from 'utils'
import './style'

const SubMenu = Menu.SubMenu;

export default class myMenu extends React.Component {
  renderItem(item, index) {
    const { handleClickMenu } = this.props
    const { icon, name, children, link } = item
    if (!children || !children.length) {
    return (
      <Menu.Item key={link} onClick={handleClickMenu.bind(this, item)}>
        {icon && <Icon type={icon} />}
        <span>{name}</span>
      </Menu.Item>
    )
}
    return (
      <SubMenu
        title={<span><Icon type={icon}/><span>{name}</span></span>}
        key={`sub_${index}`}
      >
        {children.map((child) => (
          this.renderItem(child)
        ))}
      </SubMenu>
    )
  }

  render() {
    const { map } = this.props
    const { location: { pathname } } = history
    return (
      <Menu theme='dark' mode='inline' defaultOpenKeys={['sub_0']} defaultSelectedKeys={[pathname]}>
        {map.map((item, index) => this.renderItem(item, index))}
      </Menu>
    )
  }
}
