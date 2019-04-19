import Router from './router'

export { default as request } from './request'

export { default as history } from './history'

export { default as upload } from './upload'

export * from './format'

export const menuMap = [
  { icon: 'pie-chart', name: '商品中心', children: [
    { name: '商品管理', link: '/product/manage' },
    { name: '商品审核', link: '/product/review' }
  ]},
  { icon: 'user', name: '用户中心', children: [
    { name: '前台用户管理', link: '/user/front' },
    { name: '后台用户管理', link: '/user/back' }
  ]},
  { icon: 'team', name: '类目中心', children: [
    { name: '类目管理', link: '/category' }
  ]}
]

export const routeConfig = {
  app: [
    { alias: '/', component: 'Home', exact: true },
    { alias: '/product/manage', component: 'ProductManage', breadCrumb: '商品中心/商品管理' },
    { alias: '/product/add', component: 'ProductAdd', breadCrumb: '商品中心/商品管理/新增商品' },
    { alias: '/product/edit/:id', component: 'ProductEdit', breadCrumb: '商品中心/商品管理/编辑商品' },
    { alias: '/product/review', component: 'ProductReview', breadCrumb: '商品中心/商品审核' },
    { alias: '/user/front', component: 'FrontUser', breadCrumb: '用户中心/前台用户管理' },
    { alias: '/user/back', component: 'BackUser', breadCrumb: '用户中心/后台用户管理' },
    { alias: '/user/add', component: 'UserAdd', breadCrumb: '用户中心/用户注册' },
    { alias: '/category', component: 'Category', breadCrumb: '类目中心/类目管理' },
    { alias: '/setting/person', component: 'PersonSetting', breadCrumb: '设置/个人设置' }
  ],
  others: [
    { alias: '/login', component: 'Login' }
  ]
}

export const router = new Router(routeConfig, menuMap)
