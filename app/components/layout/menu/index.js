import React from 'react'
import { Menu, Icon } from 'antd'
import { history } from 'utils'

const SubMenu = Menu.SubMenu;

export default class myMenu extends React.Component {
  constructor(props) {
    super(props)
    const { location: { pathname } } = history
    let openKey = 0
    props.map.forEach((item, index) => item.children.forEach((child => {
      if (`/app${child.link}` === pathname) {
        openKey = index
      }
    })))

    this.state = {
      defaultSelect: pathname,
      openKeys: [`sub_${openKey}`]
    }
  }

  renderItem(item, index) {
    const { handleClickMenu, user: { level: userLevel } } = this.props
    const { icon, name, children, link, level } = item
    if (!children || !children.length) {
      if (userLevel < level) return
      return (
        <Menu.Item key={'/app' + link} onClick={handleClickMenu.bind(this, item)}>
          {icon && <Icon type={icon} />}
          <span>{name}</span>
        </Menu.Item>
      )
    }
    if (!children.filter(({ level }) => userLevel >= level).length) return
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
    const { defaultSelect, openKeys } = this.state
    return (
      <Menu
        theme='dark'
        mode='inline'
        onOpenChange={this.onOpenChange}
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={[defaultSelect]}
      >
        {map.map((item, index) => this.renderItem(item, index))}
      </Menu>
    )
  }
}
