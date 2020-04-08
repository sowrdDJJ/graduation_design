const state = {
  currFriendId: JSON.parse(sessionStorage.getItem('currFriendId'))
}

const mutations = {
  UPDATA_CURR_FRIENDID (state, currData) {
    state.currFriendId = currData
  }
}

const actions = {
  obtionCurrFriendId (mutations, currData) {
    return new Promise((resolve, reject) => {
      if (currData) {
        sessionStorage.setItem('currUserData', JSON.stringify(currData))
        mutations.commit('UPDATA_CURR_FRIENDID', currData)
        resolve()
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('数据异常')
      }
    })
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}
