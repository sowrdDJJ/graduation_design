<template>
  <div class="navigation-box">
    <div class="navigation-title home" @click="judgeLoginState(`/`)">
        <div class="navigation-title-content">
            <span class="iconfont">&#xe8ba;</span>
            <br/>
            <span>首页</span>
        </div>
        <transition enter-active-class="animated rubberBand">
          <div class="navigation-animate-home" v-show="navigationList[0].state"></div>
        </transition>
    </div>
    <div class="navigation-title dialogue" @click="judgeLoginState(`/user/Dialogue`)">
            <a href="javascript:;">
              <div class="navigation-title-content">
                <span class="iconfont">&#xe8bf;</span>
                <br/>
                <span>信息</span>
              </div>
            </a>
        <transition enter-active-class="animated rubberBand">
          <div class="navigation-animate-dialogue" v-show="navigationList[1].state"></div>
        </transition>
    </div>
    <div class="navigation-title presonal" @click="judgeLoginState('/user/personal')">
            <a href="javascript:;">
              <div class="navigation-title-content">
                <span class="iconfont">&#xe6b8;</span>
                <br/>
                <span>我的联盟</span>
              </div>
            </a>
        <transition enter-active-class="animated rubberBand">
          <div class="navigation-animate-personal" v-show="navigationList[2].state"></div>
        </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeNavigation',
  data () {
    return {
      navigationList: [{
        'name': 'home',
        'state': false
      }, {
        'name': 'dialogue',
        'state': false
      }, {
        'name': 'personal',
        'state': false
      }],
      oldRouter: 'home'
    }
  },
  methods: {
    judgeLoginState (object) {
      if (this.token) {
        if (this.oldRouter !== object) {
          this.oldRouter = object
          this.$router.push({path: object})
          this.judgeMoveTag(object)
        }
      } else {
        this.$router.push(`/account`)
        this.oldRouter = object
      }
    },
    judgeMoveTag (object) {
      let matching = null
      if (object === '/user/personal' || object.indexOf('/user/Order') !== -1) {
        matching = this.navigationList[2].name
      } else if (object === '/user/Dialogue') {
        matching = this.navigationList[1].name
      } else {
        matching = this.navigationList[0].name
      }
      this.navigationList = this.navigationList.map(e => {
        if (e.name === matching) {
          e.state = true
          return e
        } else {
          e.state = false
          return e
        }
      })
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  mounted () {
    this.judgeMoveTag(this.$route.path)
  },
  activated () {
    this.judgeMoveTag(this.$route.path)
  },
  deactivated () {
    this.navigationList = this.navigationList.map(e => {
      e.state = false
      return e
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.navigation-box
  z-index: 98
  display: flex
  position: fixed
  bottom: 0
  height: 1.1rem
  width: 7.5rem
  background: $bgColorSecond
  border-radius: .2rem .2rem 0 0
  .navigation-title
    position: relative
    float: left
    width: 2.475rem
    height: 1.1rem
    padding-top: .1rem
    line-height: 0.4rem
    text-align: center
    .navigation-title-content
      color: #fff
      font-size: .2rem
      font-weight: 400
      .iconfont
        font-size: .4rem
    .navigation-animate-home,.navigation-animate-dialogue,.navigation-animate-personal
      z-index: -1
      position: absolute
      top: 0
      width: 2.475rem
      padding-top: .1rem
      height: 1.1rem
      border-radius: .1rem
      background: $bgColor
</style>
