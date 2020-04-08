<template>
  <div>
    <div class="search-real-box">
          <div class="search-real">
            <div class="search-real-input">
              <span class="iconfont out-search-real" @click="outSeach">&#xe61d;</span>
              <span class="iconfont header-iconfont">&#xe8bb;</span>
              <input type="text" class="search-real-keyword" v-model="seachKeyWord"  @click="inputKeyWord()" placeholder="搜索">
            </div>
          </div>
          <div class="search-option-btn">
            <van-dropdown-menu style="width:100%; background:#dbecec;">
              <van-dropdown-item v-model="value1" :options="option1" />
              <van-dropdown-item v-model="value2" :options="option2" />
            </van-dropdown-menu>
          </div>
    </div>
  </div>
</template>

<script>
import Bus from 'bus'
export default {
  name: 'SeachHeader',
  data () {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  methods: {
    outSeach () {
      this.$router.push('/')
    },
    inputKeyWord () {
      Bus.$emit('keyWordTransmisstion', this.$route.params.seachKeyWord)
      this.$router.push('/SeahFrame')
      this.$destroy()
    }
  },
  computed: {
    seachKeyWord () {
      return this.$route.params.seachKeyWord
    }
  }
}
</script>

<style lang='stylus' seoped>
@import '~styles/varibles.styl'
.search-real-box >>> .van-dropdown-menu
  width: 100%
.search-option-btn >>> .van-ellipsis
  overflow: none
.search-real-box
  z-index: 99
  position: absolute
  width: 100%
  height: 2rem
  top: 0
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
        font-size: .4rem
        font-weight: 600
        margin-left: .2rem
        text-align: center
        color: #fdf5f5
      .header-iconfont
        background: #fff
        color: #666
        padding-left: .12rem
        margin-left: .5rem
        border-radius:  .2rem 0 0 .2rem
      .search-real-keyword
        padding: 0 .12rem
        border-radius: 0 .2rem .2rem 0
        width: 75%
        color: #333
  .search-option-btn
    display:flex
    justify-content: center
    width: 100%
    position: absolute
    top: 1.3rem
</style>
