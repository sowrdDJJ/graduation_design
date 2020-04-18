<template>
  <div class="swiper">
    <div class="swiper-scroll" :style="{'width': `${scrollWidth}px`}">
        <ul v-if="list.length !== 0">
        <li class="swiper-content" v-for="(itme, index) of list" :key="index">
            <a class="swiper-img" :href="itme.commodity_link" :style="{'background': `url('${itme.commodity_img}')`}">
            </a>
        </li>
        </ul>
    </div>
    <div class="swiper-btn">
      <ul v-if="list.length !== 0">
        <li class="btn" v-for="(item, index) of list" :key="index" :style="{'width': `${btnWidth}rem`}">
          <a href="javaScript:;"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    list: Array
  },
  data () {
    return {
      btnWidth: 0,
      scrollWidth: 0
    }
  },
  methods: {
    getInformation () {
      this.btnWidth = this.list.length * 0.2 + 0.4
      this.scrollWidth = this.list.length * document.getElementsByClassName('swiper')[0].clientWidth
    }
  },
  mounted () {
    this.getInformation()
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
.swiper
  position: relative
  width: 100%
  height: 100%
  box-shadow: $box-shadow
  overflow: hidden
  .swiper-scroll
    height: 100%
    .swiper-content
      float: left
      width: 100%
      height: 100%
      .swiper-img
        display: block
        width: 100%
        height: 100%
        background-size: 100%
  .swiper-btn
    display: flex
    height: .5rem
    justify-content: space-around
    align-item: center
    .btn
      float: left
      background: white
      width: .2rem
      height: .2rem
      border-radius: .1rem
</style>
