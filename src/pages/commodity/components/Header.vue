<template>
  <div>
    <div class="commodity-title">
        <div class="out-btn">
          <div class="out" @click="goBack">
                  <span class="iconfont">&#xe697;</span>
          </div>
        </div>
        <div class="title">
          <span>商品详情</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommodityHeader',
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.commodity-title
  display: flex
  justify-content: center
  align-content: space-around
  height: 1rem
  width: 7.5rem
  .out-btn
    width: 2rem
    height: 1rem
    padding: .25rem
    box-sizing: border-box
    .out
      box-shadow: 1px 1px .2rem grey
      width: .5rem
      height: .5rem
      padding-right: .1rem
      line-height: .5rem
      font-size: .4rem
      font-weight: 600
      border: .05rem solid white
      border-radius: .2rem
      background: white
      color:white
      .iconfont
        font-size: .5rem
        font-weight: 600
        color: #fd0e0e
  .title
    width: 5rem
    height: 1rem
    line-height: 1rem
    color: #de426b
    font-size: .4rem
    font-weight: 600
    span
      text-align: center
      margin-left: .7rem
</style>
