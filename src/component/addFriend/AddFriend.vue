<template>
  <div>
    <transition enter-active-class="animated bounceInDown" leave-active-class="animated fadeOutUp" :duration="400">
        <div   class="search-real-box">
          <div class="search-real" >
            <div class="search-real-input">
              <span class="iconfont header-iconfont">&#xe8bb;</span>
              <input type="text" class="search-real-keyword"  placeholder="搜索" autofocus='autofocus' ref="keyWord" v-model="selectAccountNumber">
              <span class="out-search-real" @click="goBack()" >取消</span>
              <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight" :duration="400">
                <div class="search-real-content"  ref="search">
                  <ul>
                  <transition-group enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" :duration="400">
                      <li class='search-real-content-li'  key="0">
                          <a href="javascript:;" class='search-real-content-li-a' @click="selectAddFunction('private')" >按个人编号查找:{{selectAccountNumber}}</a>
                      </li>
                      <li class='search-real-content-li' key="1">
                          <a href="javascript:;" class='search-real-content-li-a' @click="selectAddFunction('public')" >按聊天群编号查找:{{selectAccountNumber}}</a>
                      </li>
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
import { mapGetters } from 'vuex'
export default {
  name: 'addFriend',
  data () {
    return {
      selectAccountNumber: '',
      objectChoice: ''
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.push('/user/Dialogue') : this.$router.push('/')
    },
    getSelcet (choice) {
      this.objectChoice = choice
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getFriend',
        params: {
          selectAccountNumber: this.selectAccountNumber,
          choice: choice,
          actionState: 'select'
        }
      }).then(resulte => {
        if (resulte) {
          this.$router.push(`/PrivateInterFace/userId=${this.selectAccountNumber}`)
        } else {
          this.$toast.fail('用户不存在')
        }
      }).catch(err => {
        console.log(err)
        this.$toast.fail('请求失败')
      })
    },
    selectAddFunction (choice) {
      this.getSelcet(choice)
    }
  },
  computed: {
    ...mapGetters(['currUserData'])
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
.search-real-box
  position: absolute
  width: 100vw
  height: 100vh
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
          color: #ccc
</style>
