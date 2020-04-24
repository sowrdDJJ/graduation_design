<template>
  <div>
    <transition enter-active-class="animated bounceInDown" leave-active-class="animated fadeOutUp" :duration="400">
        <div   class="search-real-box">
          <div class="search-real" >
            <div class="search-real-input">
              <span class="iconfont header-iconfont">&#xe8bb;</span>
              <input type="text" class="search-real-keyword" v-model="keyWord" placeholder="搜索" autofocus='autofocus' ref="keyWord">
              <span class="out-search-real" @click="clickInput()">取消</span>
              <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight" :duration="400">
                <div class="search-real-content" v-show="keyWord" ref="search">
                  <ul>
                    <router-link :to="`/seachFrame/commodity/keyWord=${keyWord}`" class="search-real-content-li-a"  :key="list.length">
                    <li class="search-real-content-li" v-show="hasNodata" v-text="keyWord"></li>
                    </router-link>
                  <transition-group enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" :duration="400">
                    <router-link :to="`/seachFrame/commodity/keyWord=${item.name}`" class="search-real-content-li-a" v-for="item of list" :key="item.id">
                    <li class="search-real-content-li"  @click="headerCommodityClick(item.name)">
                      {{item.name}}
                    </li>
                    </router-link>
                  </transition-group>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>
    </transition>
      <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" :duration="400">
        <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Bus from 'bus'
import Bscroll from 'better-scroll'
// import axios from 'axios'
export default {
  name: 'SeachFrame',
  data () {
    return {
      keyWord: '',
      list: [],
      timer: null,
      inputKeyWords: '',
      commodityNameLetter: '',
      commodityList: {}
    }
  },
  watch: {
    keyWord () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyWord) {
        this.list = []
      } else {
        this.timer = setTimeout(() => {
          this.list = []
          const result = []
          this.commodityList.forEach(e => {
            if (e.spell.indexOf(this.keyWord) > -1 || e.name.indexOf(this.keyWord) > -1) {
              result.push(e)
            }
          })
          this.list = result
          window.scrollTo(0, 0)
        }, 100)
      }
    }
  },
  computed: {
    hasNodata () {
      return !this.list.length
    }
  },
  methods: {
    clickInput () {
      this.$router.push('/')
    },
    headerCommodityClick (commodityName) {
      this.keyWord = commodityName
      this.keyWord = ''
    },
    obtainLetter (letter) {
      this.keyWord = letter
    },
    // getSeachKeyList () {
    //   axios.get('/api/keyStore.json')
    //     .then(this.inputSeachKeyList)
    // },
    // inputSeachKeyList (res) {
    //   res = res.data
    //   if (res.ret && res.data) {
    //     this.commodityList = res.data
    //   }
    // },
    keyWordTranmisstion (val) {
      this.keyWord = val
      this.$refs.keyWord.focus()
    }
  },
  created () {
    Bus.$on('commodityNameLetter', this.obtainLetter)
  },
  mounted () {
    // this.getSeachKeyList()
  },
  updated () {
    this.scroll = new Bscroll(this.$refs.search, { mouseWheel: true, click: true, tap: true })
  },
  activated () {
    this.$refs.keyWord.focus()
    Bus.$on('keyWordTransmisstion', this.keyWordTranmisstion)
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
.search-real-box
  position: absolute
  width: 7.5rem
  height: 13.33rem
  background: $bgColorFirst
  .search-real
    position: absolute
    width: 100%
    top: .3rem
    background:$bgColorSecond
    box-shadow:$box-shadow
    border-radius: .1rem
    .search-real-input
      display: flex
      line-height: .66rem
      color: #fff
      padding: .1rem .2rem
      box-sizing: border-box
      .out-search-real
        font-size: .3rem
        margin-left: .2rem
        text-align: center
        color: #fdf5f5
      .header-iconfont
        background: #fff
        color: #666
        padding-left: .12rem
        border-radius:  .2rem 0 0 .2rem
      .search-real-keyword
        padding: 0 .12rem
        border-radius: 0 .2rem .2rem 0
        width: 70%
        color: #333
    .search-real-content
      z-index: 2
      position: absolute
      overflow: hidden
      height: 8.5rem
      padding: .1rem 0 .4rem .4rem
      top: 1.5rem
      left: 0rem
      right: 0
      bottom: 0
      background: $bgColorFirst
      .search-real-content-li
        line-height: 0.62rem
        margin-top: 0.3rem
        padding-left: 0.2rem
        color: #666
        width: 100%
        border-bottom: .01rem solid #e1e5e8
        .search-real-content-li-a
          color: #333
</style>
