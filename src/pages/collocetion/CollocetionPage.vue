<template>
   <div class="Collocetion-box">
    <header class="colloection-header">
      <Collocetion-header @cleaCommdityStateData='clearCommodityData' :colloectionTitle='colloectionTitle'></Collocetion-header>
    </header>
    <main class="colloection-main">
      <Collocetion-middel :commodityList='commodityList' @commodityNumberChange='commodityNumberComputed'></Collocetion-middel>
    </main>
   </div>
</template>

<script>
// import Bscroll from 'better-scroll'
// import Bus from 'bus'
import CollocetionHeader from './components/Header'
import CollocetionMiddel from './components/Middel'
import {observable} from '@/utils/observable'
import { mapGetters } from 'vuex'
export default {
  name: 'CollocetionPage',
  components: {
    CollocetionHeader,
    CollocetionMiddel
  },
  data () {
    return {
      commodityList: [],
      colloectionTitle: ''
    }
  },
  methods: {
    getCityInfo () {
      if (this.commodityClass) {
        this.$store.dispatch('user/getUserOrderInfo', {
          url: '/getUserColloection',
          params: {
            commodityClass: this.commodityClass
          }
        }).then(resulte => {
          if (resulte.length !== 0 && resulte) {
            this.colloectionTitle = resulte[0].commodity_Class
            this.commodityList = resulte
          }
        })
      } else {
        this.$router.go(-1)
      }
    },
    commodityNumberComputed (letter) {
      this.commodityList = this.commodityList.map((e) => {
        if (e.id === letter.id) {
          if (letter.style === 'add') {
            let value = e.number + 1
            if (value < 10) {
              e.number = value
            }
            return e
          } else {
            let value = e.number - 1
            if (value > 0) {
              e.number = value
            }
            return e
          }
        } else {
          return e
        }
      })
    },
    clearCommodityData () {
      const delList = this.commodityList.filter((e) => e.state === true)
      this.commodityList = this.commodityList.filter((e) => e.state !== true)
      this.$store.dispatch('user/postUserOrderInfo', {
        url: 'postUserColloection',
        params: {
          actionStyle: 'del',
          colloectionList: delList
        }
      }).then(resulte => {
        if (resulte) {
          this.$toast.success('删除成功')
        } else {
          this.$toast.fail('请稍后...')
        }
      }).catch(error => {
        console.log(error)
        this.$toast.fail('请稍后...')
      })
    }
  },
  computed: {
    ...mapGetters(['currUserData']),
    commodityClass () {
      return observable.commodityClass
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
--window-width = 7.5rem
--window-height = 12.3rem
--header-height = 1.5rem
--header-width = 7.5rem
--main-height = 10.8rem
--main-width = 7.5rem

.Collocetion-box
  z-index: 3
  background: white
  height: 12.3rem
  width: 7.5rem
  .colloection-header
    width: --header-width
    height: --header-height
  .colloection-main
    width: --main-width
    height: --main-height
</style>
