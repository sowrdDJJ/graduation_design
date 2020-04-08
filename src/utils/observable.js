import vue from 'vue'

export const observable = vue.observable({
  payId: null,
  action: 'pay',
  commodityClass: null
})

export const mutations = {
  setPayId (payId) {
    observable.payId = payId
  },
  setAction (action) {
    observable.action = action
  },
  setCommodityClass (commodityClass) {
    observable.commodityClass = commodityClass
  }
}
