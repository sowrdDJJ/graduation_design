<template>
 <div>
   <div class="shoppingCar-box">
     <header class="shoppingCar-header">
      <shoppingCar-header @cleaCommdityStateData='clearCommodityData'></shoppingCar-header>
     </header>
     <main class="shoppingCar-main">
      <shoppingCar-middel :commodityList='commodityList' @commodityNumberChange='commodityNumberComputed'></shoppingCar-middel>
     </main>
   </div>
 </div>
</template>

<script>
import ShoppingCarHeader from './compeonts/Header'
import ShoppingCarMiddel from './compeonts/Middel'
import { mapGetters } from 'vuex'
export default {
  name: 'PersonalShoppingCar',
  components: {
    ShoppingCarHeader,
    ShoppingCarMiddel
  },
  data () {
    return {
      commodityList: []
    }
  },
  methods: {
    getCityInfo () {
      this.$store.dispatch('user/getUserCommodityInfo', '/getUserShoppingCar')
        .then(resulte => {
          if (resulte) {
            resulte.forEach(element => {
              this.$set(element, 'state', true)
            })
            this.commodityList = resulte
          }
        })
        .catch((err) => {
          console.log(err)
          this.$toast.fail(err)
        })
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
      this.$store.dispatch('user/postUserCommodityInfo',
        {
          params: {
            data: delList,
            actionStyle: 'del'
          },
          url: '/postUserShoppingCar'
        })
        .then(resulte => {
          if (resulte.ret) {
            this.$toast.success('删除成功')
          } else {
            this.$toast.fail('系统维护中')
          }
        })
        .catch(err => {
          this.$toast.fail(err.msg)
        })
    }
  },
  computed: {
    ...mapGetters(['currUserData'])
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

.shoppingCar-box
  z-index: 3
  background: white
  height: 12.3rem
  width: 7.5rem
  .shoppingCar-header
    width: --header-width
    height: --header-height
  .shoppingCar-main
    width: --main-width
    height: --main-height
</style>
