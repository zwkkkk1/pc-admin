import Router from './router'

export { default as request } from './request'

export { default as history } from './history'

export { default as upload } from './upload'

export { default as uploadOSS } from './uploadOSS'

export { default as config } from './config'

export { default as enumPreset } from './enum'

export * from './lib'

export * from './format'

export const menuMap = [
  { icon: 'pie-chart', name: '商品中心', children: [
    { name: '商品管理', link: '/product/manage', level: 1 },
    { name: '商品列表', link: '/product/list', level: 1 },
    { name: '商品审核', link: '/product/review', level: 2 }
  ]},
  { icon: 'user', name: '用户中心', children: [
    { name: '前台用户管理', link: '/user/front', level: 2 },
    { name: '后台用户管理', link: '/user/back', level: 3 }
  ]},
  { icon: 'team', name: '类目中心', children: [
    { name: '类目管理', link: '/category', level: 2 }
  ]}
]

export const routeConfig = {
  app: [
    { alias: '/', component: 'Home', exact: true },
    { alias: '/product/manage', component: 'ProductManage' },
    { alias: '/product/add', component: 'ProductAdd', breadCrumb: '商品中心/商品管理/新增商品' },
    { alias: '/product/edit/:id', component: 'ProductEdit', breadCrumb: '商品中心/商品管理/编辑商品' },
    { alias: '/product/list', component: 'ProductList' },
    { alias: '/product/review', component: 'ProductReview' },
    { alias: '/user/front', component: 'FrontUser' },
    { alias: '/user/back', component: 'BackUser' },
    { alias: '/user/add', component: 'UserAdd', breadCrumb: '用户中心/用户注册' },
    { alias: '/category', component: 'Category' },
    { alias: '/setting/person', component: 'PersonSetting', breadCrumb: '设置/个人设置' },
    { alias: '/setting/collect', component: 'PersonCollect', breadCrumb: '设置/我的收藏' },
    { alias: '/setting/contact', component: 'PersonContact', breadCrumb: '设置/联系方式' }
  ],
  others: [
    { alias: '/login', component: 'Login' }
  ]
}

export const router = new Router(routeConfig, menuMap)
