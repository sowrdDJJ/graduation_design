import { asyncRoutes, constantRoutes } from '@/router'

function hsaPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.inludes(role))
  } else {
    return true
  }
}

function filterAsyncRouter (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {...route}
    if (hsaPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({commit}, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      console.log(typeof (roles))
      if (roles.includes('user')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRouter(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
