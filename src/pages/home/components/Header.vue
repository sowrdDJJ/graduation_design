<template>
  <div class="header-content">
    <div class="home-title">
      <span>英雄联盟</span>
    </div>
    <div class="search">
      <div class="search-input">
        <span class="iconfont header-iconfont">&#xe8bb;</span>
        <input type="text" class="search-keyword"  @click="clickInput()"  placeholder="搜索">
      </div>
    </div>
  </div>
</template>

<script>
import Bus from 'bus'
export default {
  name: 'HomeHeader',
  methods: {
    clickInput () {
      Bus.$emit('commodityNameLetter', '')
      this.$router.push('/seachFrame')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.header-content
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: space-around
  padding: .2rem
  box-sizing: border-box
  width: 100%
  height: 100%
  .home-title
    width: 50%
    display: block
    width: 2.6rem
    height: .5rem
    z-index: 1
    text-align: center
    line-height: .5rem
    font-size: .5rem
    font-weight: 900
    color: white
  .search
    width: 95%
    display: flex
    align-items: center
    background:$bgColorSecond
    box-shadow:$box-shadow
    border-radius: .1rem
    .search-input
      display: flex
      justify-content: center
      line-height: .66rem
      width: 100%
      color: #fff
      padding: .12rem .8rem
      box-sizing: border-box
      .header-iconfont
        background: #fff
        color: #666
        padding-left: .12rem
        border-radius:  .2rem 0 0 .2rem
      .search-keyword
        padding: 0 .12rem
        border-radius: 0 .2rem .2rem 0
        width: 88%
        color: #333

</style>
