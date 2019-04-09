import Home from 'pages/home'
import Login from 'pages/login'
import ProductManage from 'pages/product/manage'
import ProductReview from 'pages/product/review'
import FrontUser from 'pages/user/front'
import BackUser from 'pages/user/back'
import Category from 'pages/category'

const prefix = '/app'

export const menuMap = [
  { icon: 'pie-chart', name: '商品管理', children: [
    { name: '商品管理', link: `${prefix}/product/manage` },
    { name: '商品审核', link: `${prefix}/product/review` },
  ]},
  { icon: 'user', name: '用户管理', children: [
    { name: '前台用户管理', link: `${prefix}/user/front` },
    { name: '后台用户管理', link: `${prefix}/user/back` },
  ]},
  { icon: 'team', name: '类目管理', children: [
    { name: '类目管理', link: `${prefix}/category` },
  ]},
]

export const routeConfig = [
  { path: 'pages/login', alias: '/login', component: Login },
  { path: 'pages/home', alias: `${prefix}/`, component: Home, exact: true },
  { path: 'pages/product/manage', alias: `${prefix}/product/manage`, component: ProductManage },
  { path: 'pages/product/review', alias: `${prefix}/product/review`, component: ProductReview },
  { path: 'pages/user/front', alias: `${prefix}/user/front`, component: FrontUser },
  { path: 'pages/user/back', alias: `${prefix}/user/back`, component: BackUser },
  { path: 'pages/category', alias: `${prefix}/category`, component: Category },
]

export { default as request } from './request'
