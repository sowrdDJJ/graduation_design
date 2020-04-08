<template>
  <div class="order-middle">
    <div class="order-navgation-box">
        <ul>
            <router-link to='/user/Order/OrderPay'>
              <li class="order-navgation" :class="{'action':orderNavigationShowList==='OrderPay'}" @click="orderNavgation('OrderPay')">代付款</li>
            </router-link>
            <router-link to='/user/Order/OrderReceiv'>
              <li class="order-navgation" :class="{'action':orderNavigationShowList==='OrderReceiv'}" @click="orderNavgation('OrderReceiv')">待收货</li>
            </router-link>
            <router-link to='/user/Order/OrderEvaluate'>
              <li class="order-navgation" :class="{'action':orderNavigationShowList==='OrderEvaluate'}" @click="orderNavgation('OrderEvaluate')">待评价</li>
            </router-link>
        </ul>
    </div>
    <div class="order-content">
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in" duration='1000'>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Bus from 'bus'
export default {
  name: 'OrderMiddle',
  data () {
    return {
      orderNavigationShowList: 'OrderPay',
      transtionOrderNavigationValue: ''
    }
  },
  methods: {
    orderNavgation (object) {
      const orderNavigationList = ['OrderPay', 'OrderReceiv', 'OrderEvaluate']
      orderNavigationList.forEach(e => {
        if (object === e) {
          this.orderNavigationShowList = e
        }
      })
    },
    initialOrderNavgation () {
      const initialOrderNavgationList = ['OrderPay', 'OrderReceiv', 'OrderEvaluate']
      initialOrderNavgationList.forEach(e => {
        if (this.$route.name === e) {
          this.orderNavigationShowList = e
        }
      })
    },
    transtionOrderNavigation (e) {
      this.transtionOrderNavigationValue = e
    }
  },
  created () {
    Bus.$on('transtionOrderNavigation', this.transtionOrderNavigation)
  },
  mounted () {
    this.initialOrderNavgation()
  },
  activated () {
    console.log(this.transtionOrderNavigationValue)
    this.orderNavigationShowList = this.transtionOrderNavigationValue
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@keyframes orderNavgationAinmation {
    from {
        transform: rotateY(0)
    }
    to {
        transform: rotateY(360deg)
    }
}
--window-width = 7.5rem
--middle-height = 10.8rem
--nav-width = 7.5rem
--nav-height = 1rem
--tag-width = 2.5rem
--tag-height = 1rem
--content-height = 9.8rem
--content-width = 7.5rem

.order-middle
  height: --middle-height
  width: --window-width
  display: flex
  flex-wrap: wrap
  align-content: space-around
  .order-navgation-box
    width: --nav-width
    height: --nav-height
    background: $bgColorSecond
    .order-navgation
      float: left
      width: --tag-width
      height: --tag-height
      text-align: center
      line-height: --tag-height
      font-size: .3rem
      font-weight: 500
      color: white
    .action
        animation: orderNavgationAinmation 3s
        background: $bgColorFirst
        text-shadow: .1rem .1rem .2rem #ccc
  .order-content
    height: --content-height
    width: --content-width
</style>
