<template>
  <div class="collection-box">
    <swiper :options="swiperOption" v-if="commodityClass.length">
      <swiper-slide v-for="item of commodityClass" :key="item.id" class="swiper-slide" style="height: 2rem width: 2rem">
          <div class="collection-img-box" @click="getCommodityClass(item.class)">
            <span class="iconfont">&#xe8b0;</span>
            <img :src="item.imgUrl" :alt="item.class" class="collection-img-content">
          </div>
          <a class="collection-title">{{item.class}}</a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mutations } from '@/utils/observable'
export default {
  name: 'PersonalCollection',
  props: {
    collection: Array,
    colloectionImg: Array
  },
  data () {
    return {
      swiperOption: {
        clickable: true,
        effect: 'coverflow',
        slidesPerView: 2,
        roundLengths: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows: true
        }
      },
      commodityClass: [],
      currUserId: this.$route.params.UserId
    }
  },
  methods: {
    setCommodityClass () {
      this.commodityClass = this.colloectionImg.filter((e) => {
        for (let i of this.commodityClass) {
          if (e.class === i) {
            return true
          }
        }
      })
    },
    getCommodityClass (commodityClass) {
      mutations.setCommodityClass(commodityClass)
      this.$router.push('/user/CollocetionPage')
    }
  },
  watch: {
    collection () {
      let list = this.collection.map((e) => {
        return e.commodity_Class
      })
      list = new Set(list)
      for (let i of list) {
        this.commodityClass.push(i)
      }
      this.setCommodityClass()
    },
    $route (to, from) {
      if (to.name === 'personal') {
        this.setCommodityClass()
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
 @import '~styles/varibles.styl'
 .collection-box >>> .swiper-slide-active
   box-shadow: .1rem .1rem .2rem #888
   border: .01rem solid #c1c1c1
   border-radius: .1rem
   height: 40% !important
   width: 50%!important
   background-image: linear-gradient(white,$bgColorFirst)
  .collection-box >>> .swiper-container
    z-index: 0
.collection-box
  overflow: hidden
  border-radius: .2rem
  width: 100%
  height: 0
  padding-bottom: 57.25%
  .collection-img-box
      margin: 5% 25%
      width: 50%
      height: 50%
      border-radius: .2rem
      box-shadow: .1rem .1rem .2rem #888
    .collection-img-content
      height: 100%
      width: 100%
      border-radius: .2rem
  .collection-title
    display: block
    margin: .3rem
    text-align: center
    font-size: .3rem
    color: white
  .iconfont
    position: absolute
    top: .3rem
    right: .1rem
    font-size: .3rem
</style>
