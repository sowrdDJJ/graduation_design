<template>
  <div class="commodityBox">
    <header class="commodity-header">
      <commodity-header></commodity-header>
    </header>
    <main class="commodity-main">
      <commodity-middel></commodity-middel>
    </main>
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration='300'>
      <gallery v-show="galleryShow"></gallery>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import Bus from 'bus'
import Gallery from 'component/gallery/Gallery'
import CommodityHeader from './components/Header'
import CommodityMiddel from './components/Middel'
import { mapGetters } from 'vuex'
export default {
  name: 'Commodity',
  components: {
    CommodityHeader,
    CommodityMiddel,
    Gallery
  },
  data () {
    return {
      commodityKey: '',
      commodityInformation: [],
      galleryShow: false,
      keepAliveId: 0
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    obtainLetter (id) {
      this.commodityKey = id
      this.commodityData.forEach(e => {
        if (e.id === id) {
          this.commodityInformation = e
        }
      })
    },
    showImgStateFs (state) {
      this.galleryShow = state
    },
    getCommodityData () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getCommodity',
        params: {
          commodityId: this.$route.params.commodityId
        }
      }).then(resulte => {
        this.getCommodityDataSucc(resulte)
      })
    },
    getCommodityDataSucc (res) {
      if (res && res.length !== 0) {
        this.commodityInformation = res
        Bus.$emit('commodityInformation', this.commodityInformation)
      } else {
        this.$toast.fail('该商品已下架')
        this.$route.go(-1)
      }
    }
  },
  created () {
    Bus.$on('showImgState', this.showImgStateFs)
  },
  mounted () {
    this.getCommodityData()
    this.keepAliveId = this.$route.params.commodityId
  },
  activated () {
    if (this.$route.params.commodityId !== this.keepAliveId) {
      this.getCommodityData()
    }
  }
}
</script>

<style lang='stylus' scoped>
--window-width = 7.5rem
--window-height = 13.33rem
--header-height = 1.3rem
--main-height = 12.03rem
.commodityBox
  z-index: 99
  height: 13.33rem
  width: 7.5rem
  background: white
  .commodity-header
    height: --header-height
    width: --window-width
  .commodity-main
    height: --main-height
    width: --window-width
</style>
