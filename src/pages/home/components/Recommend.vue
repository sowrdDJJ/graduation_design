<template>
    <div class="Recomment">
          <transition-group
          name="custom-classes-transition"
          enter-active-class="animated zoomIn"
          leave-active-class="animated bounceOutRight">
          <div class="recomment-content" v-for="item of recomment" :key="item.id">
              <a class="recomment-link" :href="item.commodity_link">
                <img :src="item.commodity_img" class="recomment-content-img">
                <label class="recomment-content-title">{{item.commodity_Name}}</label>
              </a>
          </div>
         </transition-group>
    </div>
</template>

<script>
export default {
  name: 'HomeRecomment',
  props: {
    recomment: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.Recomment
  height: 7.25rem
  width: 100%
  background: $bgColorFirst
  .recomment-content
    float: left
    width: 45%
    margin: 0.07rem 0.18rem
    height: 3.26rem
    text-align: center
    background: white
    box-shadow: .1rem .1rem .2rem #888888
    border-radius: .2rem
    .recomment-link
      display: inline-block
      height: 3.26rem
      width: 100%
      .recomment-content-img
        height: 2.2rem
        width: 100%
        margin: 0.32rem 0
        border-radius: .1rem
      .recomment-content-title
        color: #666
        font-size: .2rem
        line-height: 0.16rem
</style>
