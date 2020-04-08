import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo, getUserCommodityInfo, emitUserData, postUserCommodityInfo, getUserOrderInfo, postUserOrderInfo } from '@/api/user'

const state = {
  currUserData: '',
  currOrderList: JSON.parse(sessionStorage.getItem('orderList')),
  token: getToken(),
  roles: []
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_ROLES (state, roles) {
    state.roles = roles
    console.log(state.roles)
  },
  UPDATA_CURR_USERDATA (state, currData) {
    state.currUserData = currData
  },
  CLEAR_CURR_USERDATA (state, clearData) {
    state.currUserData = clearData
  },
  UPDATA_CURR_DATAORDER (state, currData) {
    state.currOrderList = currData
  },
  CLEAR_CURR_DATAORDER (state, clearData) {
    state.currOrderList = clearData
  }
}

const actions = {
  obtionCurrUserData (mutation, newUserData) {
    console.log(newUserData)
    return new Promise((resolve, reject) => {
      if (newUserData) {
        // sessionStorage.setItem('currUserData', JSON.stringify(newUserData))
        mutation.commit('UPDATA_CURR_USERDATA', newUserData)
        console.log(newUserData)
        resolve()
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('数据异常')
      }
    })
  },
  orderList (mutatation, newUserData) {
    sessionStorage.setItem('currOrderList', JSON.stringify(newUserData))
    mutatation.commit('UPDATA_CURR_DATAORDER', newUserData)
    console.log(newUserData)
  },
  login ({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account, password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.log({ error })
        reject(error)
      })
    })
  },
  getInfo ({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('验证失效，请重新登录')
        }
        console.log(data)
        const { roles } = data[0]
        if (!roles || roles.length <= 0) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('没有权限')
        }
        commit('SET_ROLES', roles)
        commit('UPDATA_CURR_USERDATA', data)
        resolve(data[0])
      })
    })
  },
  getUserCommodityInfo ({state}, url) {
    return new Promise((resolve, reject) => {
      getUserCommodityInfo(state.token, url).then(resulte => {
        const {data} = resulte
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserOrderInfo ({state}, data) {
    const { params = {}, url = '' } = data
    console.log(params)
    return new Promise((resolve, reject) => {
      getUserOrderInfo(state.token, url, params).then(resulte => {
        console.log(resulte)
        const {data} = resulte
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  postUserCommodityInfo ({state}, data) {
    const { params, url } = data
    return new Promise((resolve, reject) => {
      postUserCommodityInfo(state.token, params, url).then(resulte => {
        const {data} = resulte
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  postUserOrderInfo ({state}, data) {
    const { params = {}, url = '' } = data
    return new Promise((resolve, reject) => {
      postUserOrderInfo(state.token, url, params).then(resulte => {
        const {data} = resulte
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  emitUserData ({commit}, userData) {
    return new Promise((resolve, reject) => {
      console.log(userData)
      emitUserData(userData).then(responnse => {
        const { data } = responnse
        if (!data) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('修改失败')
        }
        resolve(data)
      })
    })
  },
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}
