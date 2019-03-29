import Home from 'pages/home'
import Login from 'pages/login'
import ProductManage from 'pages/product/manage'
import ProductReview from 'pages/product/review'
import FrontUser from 'pages/user/front'
import BackUser from 'pages/user/back'
import Category from 'pages/category'

export const menuMap = [
  { icon: 'pie-chart', name: '商品管理', children: [
    { name: '商品管理', link: '/product/manage' },
    { name: '商品审核', link: '/product/review' },
  ]},
  { icon: 'user', name: '用户管理', children: [
    { name: '前台用户管理', link:'/user/front' },
    { name: '后台用户管理', link: '/user/back' },
  ]},
  { icon: 'team', name: '类目管理', children: [
    { name: '类目管理', link: '/category' },
  ]},
]

export const routeConfig = [
  { path: 'pages/home', alias: '/', component: Home, exact: true },
  { path: 'pages/login', alias: '/login', component: Login },
  { path: 'pages/product/manage', alias: '/product/manage', component: ProductManage },
  { path: 'pages/product/review', alias: '/product/review', component: ProductReview },
  { path: 'pages/user/front', alias: '/user/front', component: FrontUser },
  { path: 'pages/user/back', alias: '/user/back', component: BackUser },
  { path: 'pages/category', alias: '/category', component: Category },
]

export { default as request } from './request'