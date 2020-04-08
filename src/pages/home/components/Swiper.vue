<template>
<div class="wrapper">
  <swiper :options="swiperOption" v-if='list.length' style="height: 100%">
    <!-- slides -->
    <swiper-slide v-for='item of list' :key="item.id" style="height: 100%">
      <a :href="item.commodity_link">
        <img class="swiper-img" :src="item.commodity_img">
      </a>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</div>
</template>

<script>

export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        clickable: true,
        loop: true,
        speed: 1000,
        autoplay: 5000,
        effect: 'coverflow',
        disableOnInteraction: false,
        slidesPerView: 1,
        fadeEffect: {
          crossFade: true
        },
        pagination: '.swiper-pagination'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
 @import '~styles/varibles.styl'
    .wrapper >>> .swiper-pagination-bullet-active
     background: $swiper-pagination-bullet-active !important
    .wrapper >>> .swiper-slide  !important
      height: 100%
    .wrapper
      overflow: hidden
      box-shadow: .1rem .1rem .2rem #888888
      border-radius: .2rem
      width: 95%
      height: 100%
      .swiper-img
        width: 100%
        height: 100%
</style>
