<template>
  <div class="Order-title-box">
    <div class="Order-title-Top">
      <div class="return-btn">
        <router-link to="/user/personal" tag="span" class="iconfont">&#xe61d;</router-link>
      </div>
      <div class="Order-title-content">
        <span>我的订单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderHeader'
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

.Order-title-box
  display: flex
  width: --window-width
  height: --header-height
  .Order-title-Top
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
    .Order-title-content
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
