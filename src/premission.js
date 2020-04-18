import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPegeTitle from '@/utils/get-page-titel'
NProgress.configure({showSpinner: false})

const whiteList = ['home', 'login', 'register', 'Commodity', 'seachFrame', 'SeachInterface']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPegeTitle(to.meta.title) || ''
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/account/Login') {
      next({path: '/'})
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({...to, replace: true})
        } catch (err) {
          console.log(err)
          await store.dispatch('user/resetToken')
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.name) !== -1) {
      next()
    } else {
      next('/account')
      NProgress.done()
      alert('登录失效，请重新登录')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
