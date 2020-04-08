import vue from 'vue'
import Router from 'vue-router'

import Layout from '@/Layout'
import Account from '@/pages/account/Account'

vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/home/Home'),
        name: 'home',
        meta: { title: 'Home', keepAlive: false }
      }
    ]
  },
  {
    name: 'seachFrame',
    path: '/seachFrame',
    component: () => import('component/seach/seachFrame'),
    meta: { title: '搜索', keepAlive: true },
    children: [
      {
        name: 'SeachInterface',
        path: 'commodity/keyWord=:seachKeyWord',
        component: () => import('@/pages/seach/SeachInterface'),
        meta: { title: '搜索结果', keepAlive: false }
      }
    ]
  },
  {
    path: '/account',
    component: Account,
    meta: {title: 'Account'},
    redirect: '/account/Login',
    children: [
      {
        name: 'login',
        path: '/account/Login',
        component: () => import('@/pages/account/components/Login'),
        meta: { title: '登录', keepAlive: true }
      },
      {
        name: 'register',
        path: '/account/register',
        component: () => import('@/pages/account/components/Register'),
        meta: { title: '注册', keepAlive: true }
      }
    ]
  },
  {
    name: 'Commodity',
    path: '/commodity/commodityId=:commodityId',
    component: () => import('@/pages/commodity/Commodity'),
    meta: { title: '商品详情', keepAlive: false }
  }
]

export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    meta: { title: '用户', roles: ['user'] },
    children: [
      {
        name: 'personal',
        path: '/user/personal',
        component: () => import('@/pages/personal/Personal'),
        meta: { title: '个人中心', roles: ['user'], keepAlive: false }
      },
      {
        name: 'ShoppingCar',
        path: '/user/ShoppingCar',
        component: () => import('@/pages/shoppingCar/ShoppingCar'),
        meta: { title: '个人购物车', roles: ['user'], keepAlive: false }
      },
      {
        name: 'CollocetionPage',
        path: '/user/CollocetionPage',
        component: () => import('@/pages/collocetion/CollocetionPage'),
        meta: { title: '个人收藏', roles: ['user'], keepAlive: false }
      },
      {
        name: 'Order',
        path: '/user/Order',
        redirect: '/user/Order/OrderPay',
        component: () => import('@/pages/order/Order'),
        meta: { title: '个人订单', roles: ['user'], keepAlive: false },
        children: [
          {
            name: 'OrderPay',
            path: '/user/Order/OrderPay',
            component: () => import('@/pages/order/components/OrderPay'),
            meta: { title: '我的订单', roles: ['user'], keepAlive: false },
            children: [
              {
                name: 'orderDetalis',
                path: '/user/orderDetalis/payId=:payId',
                component: () => import('component/orderDetalis/orderDetalis'),
                meta: { title: '订单详情', roles: ['user'], keepAlive: false }
              }
            ]
          },
          {
            name: 'OrderReceiv',
            path: '/user/Order/OrderReceiv',
            component: () => import('@/pages/order/components/OrderReceiv'),
            meta: { title: '我的订单', roles: ['user'], keepAlive: false }
          },
          {
            name: 'OrderEvaluate',
            path: '/user/Order/OrderEvaluate',
            component: () => import('@/pages/order/components/OrderEvaluate'),
            meta: { title: '我的订单', roles: ['user'], keepAlive: false }
          }
        ]
      },
      {
        name: 'EmitAddress',
        path: '/user/EmitAddress/payId=:payId*',
        component: () => import('component/emitAddress/EmitAddress'),
        meta: { title: '编辑地址', roles: ['user'], keepAlive: false }
      },
      {
        name: 'Dialogue',
        path: '/user/Dialogue',
        component: () => import('@/pages/dialogue/Dialogue'),
        meta: { title: '信息', roles: ['user'], keepAlive: false }
      }
    ]
  },
  {
    name: 'PriveteInterface',
    path: '/PrivateInterFace/userId=:userId*',
    component: () => import('@/component/privateInterface/PrivateInterface'),
    meta: { title: '信息界面', roles: ['user'], keepAlive: false }
  },
  {
    name: 'DialogueBox',
    path: '/user/DialogueBox/:objectUserId*',
    component: () => import('component/dialogueBox/DialogueBox'),
    meta: { title: '对话框', roles: ['user'], keepAlive: false }
  },
  {
    name: 'AddFriend',
    path: '/user/AddFriend',
    component: () => import('component/addFriend/AddFriend'),
    meta: { title: '添加好友', roles: ['user'], keepAlive: false }
  },
  {
    name: 'PasswordBtn',
    path: '/user/PasswordBtn',
    component: () => import('component/passwordBtn/PasswordBtn'),
    meta: { title: '支付页面', roles: ['user'], keepAlive: false }
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
