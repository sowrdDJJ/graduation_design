<template>
<div>
  <div class="menu-btn">
      <span class="menu-icon" @touchstart="menuContentShow">
        <transition mode="out-in" enter-active-class="animated rollIn" leave-active-class="animated rollOut" :duration="300">
        <i class="iconfont"  v-if="!menuContentShowState" :key="0">&#xe608;</i>
        <i class="iconfont"  v-if="menuContentShowState" :key="1">&#xe600;</i>
        </transition>
        菜单
      </span>
  </div>
  <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft" :duration="300">
    <div class="menu-outZone" v-show="menuContentShowState" @touchstart="menuContentShow"></div>
  </transition>
  <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" :duration="400">
    <div class="menu-content" v-show="menuContentShowState" ref="wrapper">
      <menu-content :menuList="menuList" @commodityName="commodityNameLetter"></menu-content>
    </div>
  </transition>
</div>
</template>

<script>
import Bus from 'bus'
import MenuContent from './MenuContent'
import Bscroll from 'better-scroll'
export default {
  name: 'HomeMenu',
  data () {
    return {
      chlidrenShowArray: [],
      chlidrenShowId: '',
      menuContentShowState: false,
      letter: ''
    }
  },
  components: {
    MenuContent
  },
  props: {
    menuList: Array
  },
  methods: {
    menuContentShow () {
      this.menuContentShowState = !this.menuContentShowState
    },
    commodityNameLetter (letter) {
      this.letter = letter
      console.log(this.letter)
      this.menuContentShowState = false
      Bus.$emit('commodityNameLetter', this.letter)
      this.$router.push('/SeahFrame')
    }
  },
  mounted () {
    const options = {
      scrollY: true,
      scrollX: false,
      mouseWheel: true,
      click: true,
      taps: true
    }
    this.scroll = new Bscroll(this.$refs.wrapper, options)
  }
}
</script>

<style lang='stylus' scoped>
.menu-btn
  z-index:99
  position: absolute
  right: 0rem
  top: 1.5vh
  right: 1vh
  width: 20vw
  height: 8vh
  text-align: center
  line-height: 1rem
  .menu-icon
    height: 100%
    width: 100%
    font-size: .4rem
    color: #fff
    font-weight: 600
    transition: 1s
.menu-outZone
  z-index:98
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: #130c0ca8
.menu-content
  z-index: 99
  overflow: hidden
  position: absolute
  right: 0rem
  top: 1rem
  width: 30vw
  height: 25vh
  border-radius: .1rem
  padding-top: .2rem
  background: #fff
</style>
