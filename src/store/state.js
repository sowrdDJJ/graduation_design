let defalutCurrUserData = null
let orderList = null
try {
  if (sessionStorage.getItem('currUserData')) {
    console.log(sessionStorage.getItem('currUserData'))
    defalutCurrUserData = JSON.parse(sessionStorage.getItem('currUserData'))
  }
  if (sessionStorage.getItem('orderList')) {
    orderList = JSON.parse(sessionStorage.getItem('orderList'))
  }
} catch (e) {}
export default {
  currUserData: defalutCurrUserData,
  currOrderList: orderList
}
