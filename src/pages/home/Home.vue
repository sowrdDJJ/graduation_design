<template>
  <div>
    <div class="home">
       <!-- <home-menu :menuList="menuList"></home-menu> -->
       <div class="header">
        <home-header></home-header>
       </div>
       <div class="swiper">
        <home-swipre :list="swiperList"></home-swipre>
        <!-- <home-swipreT :list="swiperList"></home-swipreT> -->
       </div>
       <div class="recomment">
        <home-recomment :recomment="recomment" ></home-recomment>
       </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwipre from './components/Swiper'
import HomeRecomment from './components/Recommend'
import HomeMenu from './components/Menu'
import HomeSwipreT from '@/component/Swiper'
export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeMenu,
    HomeSwipre,
    HomeRecomment,
    HomeSwipreT
  },
  data () {
    return {
      keyWord: '',
      swiperList: [],
      recomment: [],
      menuList: []
    }
  },
  methods: {
    getCityInfo () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/home'
      }).then(resulte => {
        for (let i in resulte) {
          if (resulte[i].commodity_Class === '轮播广告') {
            this.swiperList.push(resulte[i])
          } else {
            this.recomment.push(resulte[i])
          }
          this.menuList = resulte.menuList
        }
      }).catch(error => {
        console.error(error)
      })
    },
    handleKeyWord (KeyWord) {
      this.keyWord = KeyWord
    }
  },
  created () {
    this.getCityInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.home
  height: 100%
  min-height: 13.3rem
  width: 7.5rem
  background-image: linear-gradient($bgColorFirst, $bgColorSecond)
  justify-content: center
  .header
    height: 2.5rem
    width: 7.5rem
  .swiper
    height: 2.5rem
    width: 7.5rem
    display: flex
    justify-content: center
  .recomment
    display: flex
    justify-content: center
    height: 7.25rem
    width: 7.5rem
</style>
