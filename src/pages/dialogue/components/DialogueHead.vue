<template>
  <div class="dialogueHead-box">
      <div class="dialogueHead-userHeadImg">
        <img class="userHeadImg" :src="`/data/${userHeadImg}`">
      </div>
      <div class="search-input">
        <span class="iconfont header-iconfont">&#xe8bb;</span>
        <input type="text" class="search-keyword"  v-model="keyWord"  placeholder="搜索">
      </div>
      <div class="dialogueHead-add">
        <router-link to="/user/AddFriend">
          <span class="iconfont">&#xe641;</span>
        </router-link>
      </div>
  </div>
</template>

<script>
import Bus from 'bus'
export default {
  name: 'DialogueHead',
  data () {
    return {
      keyWord: null,
      userHeadImg: ''
    }
  },
  methods: {
    getUserHeadImg () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getUserInformation'
      }).then(resulte => {
        this.userHeadImg = resulte[0].user_Img
      }).catch(error => {
        console.log(error)
      })
    }
  },
  watch: {
    keyWord: {
      handler (newValue) {
        Bus.$emit('dialogueSearchKeyWord', newValue)
      },
      deep: true
    }
  },
  created () {
    this.getUserHeadImg()
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
--window-width = 7.5rem
--box-height = 1.5rem
--userHeadImg-width = .8rem
--userHeadImg-height = .8rem
--input-width = 4.5rem
--input-height = .6rem
--icon-width = .8rem
--icon-height = .8rem

.dialogueHead-box
  display: flex
  justify-content: space-between
  height: --box-height
  width: --window-width
  box-sizing: border-box
  border-radius: 0 0 .2rem .2rem
  padding: .35rem
  background-image: linear-gradient($bgColorFirst, $bgColorSecond)
  .dialogueHead-userHeadImg
    width: --userHeadImg-width
    height: --userHeadImg-height
    .userHeadImg
      width: 100%
      height: 100%
      border-radius: .4rem
  .search-input
    display: flex
    width: --input-width
    height: --input-height
    line-height: --input-height
    margin-top: .1rem
    color: #fff
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
  .dialogueHead-add
    width: --icon-width
    height: --icon-height
    border-radius: .4rem
    text-align: center
    line-height: --icon-height
    color: white
    .iconfont
      font-size: .4rem
</style>
