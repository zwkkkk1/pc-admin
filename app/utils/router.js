class Router {
  constructor(route, menu) {
    this.routes = {}
    this.prefix = '/app'
    this.mountRoute(route)
    this.mountMenu(menu)
  }

  mountRoute(route) {
    this.routes = Object.assign({}, route)
    Object.keys(this.routes).forEach(key => {
      let obj = {}
      this.routes[key].forEach(item => {
        const { alias, ...rest } = item
        obj[this.prefix + alias] = rest
      })
      this.routes[key] = obj
    })
  }

  mountMenu(menu) {
    menu.forEach(item => {
      const { name: subName } = item
      item.children.forEach(child => {
        const { name, link } = child
        this.routes.app[this.prefix + link].breadCrumb = `${subName}/${name}`
      })
    })
  }
}

export default Router