<template>
  <div class="commodity-data-box">

    <header class="personal-header">
      <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated zoomOut"
      :duration='400'
      mode="in-out">
      <personal-header  :key="0"></personal-header>
      </transition>
    </header>

    <main class="personal-main">
    <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated zoomOut"
    :duration='400'
    mode="in-out">
      <personal-middel :colloectionImg='colloectionImg' :collectionList='collectionList'  :key="1"></personal-middel>
    </transition>
    </main>
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft" >
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
import PersonalHeader from './components/Header'
import PersonalMiddel from './components/Middel'
export default {
  name: 'presonal',
  components: {
    PersonalHeader,
    PersonalMiddel
  },
  data () {
    return {
      collectionList: [],
      colloectionImg: [
        {
          'id': '0001',
          'class': '雕塑手办',
          'imgUrl': 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190918215352_85132.big.jpg'
        }, {
          'id': '0002',
          'class': '毛绒玩偶',
          'imgUrl': 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190723090952_54659.big.jpg'
        }, {
          'id': '0003',
          'class': '男女服饰',
          'imgUrl': 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190927232417_15783.big.jpg'
        }, {
          'id': '0004',
          'class': '周边赛事',
          'imgUrl': 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191010171219_30038.big.jpg'
        }, {
          'id': '0005',
          'class': '珠宝首饰',
          'imgUrl': 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201911/20191110140102_88888.big.jpg'
        }, {
          'id': '0006',
          'class': '其他',
          'imgUrl': 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190918190738_29365.big.jpg'
        }]
    }
  },
  methods: {
    getPersonalData () {
      this.$store.dispatch('user/getUserCommodityInfo', '/getUserColloection')
        .then((resulte) => {
          // this.collectionList
          this.collectionList = resulte
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getPersonalData()
  },
  activated () {
    this.getPersonalData()
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl';
  .commodity-data-box
    z-index: 1
    position: relative
    width: 7.5rem
    height:  12.3rem
    background: white
    .personal-header
      height: 2rem
      width: 7.5rem
    .personal-main
      height: 10.3rem
      width: 7.5rem
</style>
