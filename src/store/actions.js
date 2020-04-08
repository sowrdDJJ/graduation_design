export default {
  obtionCurrUserData (mutatation, newUserData) {
    try {
      sessionStorage.setItem('currUserData', JSON.stringify(newUserData))
    } catch (e) {}
    mutatation.commit('updateCurrUserData', newUserData)
    console.log(newUserData)
  },
  orderList (mutatation, newUserData) {
    try {
      sessionStorage.setItem('currOrderList', JSON.stringify(newUserData))
    } catch (e) {}
    mutatation.commit('updateCurrOrderList', newUserData)
    console.log(newUserData)
  }
}
