const prefix = '/app'

export { default as request } from './request'

export { default as history } from './history'

export * from './format'

export const menuMap = [
  { icon: 'pie-chart', name: '商品中心', children: [
    { name: '商品管理', link: `${prefix}/product/manage` },
    { name: '商品审核', link: `${prefix}/product/review` }
  ]},
  { icon: 'user', name: '用户中心', children: [
    { name: '前台用户管理', link: `${prefix}/user/front` },
    { name: '后台用户管理', link: `${prefix}/user/back` }
  ]},
  { icon: 'team', name: '类目中心', children: [
    { name: '类目管理', link: `${prefix}/category` }
  ]}
]

export const routeConfig = {
  app: [
    { alias: `${prefix}/`, component: 'Home', exact: true },
    { alias: `${prefix}/product/manage`, component: 'ProductManage', breadCrumb: '商品中心/商品管理' },
    { alias: `${prefix}/product/add`, component: 'ProductAdd', breadCrumb: '商品中心/商品管理/新增商品' },
    { alias: `${prefix}/product/edit/:id`, component: 'ProductEdit', breadCrumb: '商品中心/商品管理/编辑商品' },
    { alias: `${prefix}/product/review`, component: 'ProductReview', breadCrumb: '商品中心/商品审核' },
    { alias: `${prefix}/user/front`, component: 'FrontUser', breadCrumb: '用户中心/前台用户管理' },
    { alias: `${prefix}/user/back`, component: 'BackUser', breadCrumb: '用户中心/后台用户管理' },
    { alias: `${prefix}/user/add`, component: 'UserAdd', breadCrumb: '用户中心/用户注册' },
    { alias: `${prefix}/category`, component: 'Category', breadCrumb: '类目中心/类目管理' }
  ],
  others: [
    { alias: '/login', component: 'Login' }
  ]
}
