<template>
  <div class="shoppingCar-title-box">
    <div class="shoppingCar-title-Top">
      <div class="return-btn">
        <router-link to="/user/personal" tag="span" class="iconfont">&#xe61d;</router-link>
      </div>
      <div class="shoppingCar-title-content">
        <span>我的购物车</span>
      </div>
      <div class="cls-btn">
        <span class="iconfont" @click="clearCommodity">&#xe8b6;</span>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from 'bus'
export default {
  name: 'ShoppingCarHeader',
  data () {
    return {
      shoppingCarHeaderShow: false,
      commodityStateList: []
      // retreatRouter: this.$router.
    }
  },
  mounted () {
    Bus.$on('commodityListChange', this.watchCommodityStateDataList)
  },
  methods: {
    watchCommodityStateDataList (e) {
      this.commodityStateList = e
    },
    clearCommodity () {
      this.$dialog.confirm({
        title: '删除',
        message: '是否删除所选内容'
      }).then(() => {
        // on confirm
        this.$emit('cleaCommdityStateData', this.commodityStateList)
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
--window-width = 7.5rem
--header-height = 1.5rem
--header-returnBtn-height = .5rem
--header-returnBtn-width = .5rem
--header-title-width = 5.5rem
--header-title-height = 1rem
--header-cls-width = .5rem
--header-cls-height = .5rem

.shoppingCar-title-box
  display: flex
  width: --window-width
  height: --header-height
  .shoppingCar-title-Top
    z-index: 99
    display: flex
    width: --window-width
    height: --header-height
    .return-btn
      margin: .25rem
      width: --header-returnBtn-width
      height: --header-returnBtn-height
      line-height: --header-returnBtn-height
      text-align: center
      .iconfont
        font-size: .4rem
        color: #333
        font-weight: 600
        box-sizing: border-box
        padding-right: .07rem
    .shoppingCar-title-content
      height: --header-title-height
      width: --header-title-width
      box-sizing: border-box
      color: #333
      text-align: center
      line-height: --header-title-height
      font-size: .5rem
      font-weight: 600
    .cls-btn
      margin: .25rem
      width: --header-cls-width
      height: --header-cls-height
      line-height: --header-cls-height
      text-align: center
      .iconfont
        font-size: .4rem
        color: #333
        font-weight: 600
        box-sizing: border-box
        padding-right: .07rem
</style>
