<template>
  <div class="ordePay-box">
    <div class="orderPay-show" ref="orderPayShow">
        <div class="orderPay-content" :style="{'height':(orderPayContentHeight + 'rem')}">
            <div class="payContent" v-for="item of orderPayList" :key="item.id">
              <div class="payContent-img">
                  <img :src="item.imgUrl" class="img">
              </div>
               <div class="payContent-title">
                  <span class="title">{{item.title}}</span>
              </div>
              <div class="payContent-information">
                  <span class="price">价格：￥{{item.price}}</span>
                  <span class="number">数量：{{item.number}}</span>
                  <span class="size">型号：{{item.size}}</span>
              </div>
              <div class="sum-price">
                  合计：<span class="sum">￥{{pirceSum(item.price, item.number)}}</span>
              </div>
              <div class="payContent-btns">
                  <ul>
                    <router-link :to="`/user/orderDetalis/payId=${item.id}`">
                      <li class="btns details">查看详情</li>
                    </router-link>
                    <!-- <router-link :to="`orderPay/passwordBtn/action=pay&number=` + item.id"> -->
                      <li class="btns pay" @click="transtionOrderNavigation(item.id)">立即付款</li>
                    <!-- </router-link> -->
                      <li class="btns cancel" @click="destructionPayOrder(item.id)">取消订单</li>
                  </ul>
              </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Bus from 'bus'
import { mutations } from '@/utils/observable'
import { mapGetters } from 'vuex'
export default {
  name: 'OrderPay',
  data () {
    return {
      orderPayList: [],
      payId: null
    }
  },
  methods: {
    getOrderPay () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getUserOrderColumn',
        params: {
          action: 'pay'
        }
      }).then(resulte => {
        if (resulte) {
          this.orderPayList = resulte
        }
      }).catch((err) => {
        console.log({err})
        this.$toast.fail('请稍后...')
      })
    },
    transtionOrderNavigation (payId) {
      mutations.setPayId(payId)
      mutations.setAction('pay')
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getEmitAddress',
        params: {
          payId
        }
      }).then(resulte => {
        if (resulte.addressDetail === '' || resulte.areaCode === '' || resulte.name === '') {
          this.$toast.fail('请完善收货信息')
          this.$router.push(`/user/orderDetalis/payId=${payId}`)
        } else {
          this.$router.push('/user/PasswordBtn')
        }
      })
      Bus.$emit('transtionOrderNavigation', 'OrderReceiv')
    },
    destructionPayOrder (id) {
      this.$dialog.confirm({
        title: '是否取消订单',
        width: '320px'
      }).then(() => {
        this.$store.dispatch('user/postUserOrderInfo', {
          url: '/postUserOrderColumn',
          params: {
            action: 'delpay',
            orderId: id
          }
        }).then(resulte => {
          this.$toast.fail('取消成功')
          this.orderPayList = this.orderPayList.filter(e => {
            if (resulte.orderNumber === e.id) {
              return false
            } else {
              return true
            }
          })
        }).catch(error => {
          this.$toast.fail('请稍后...')
          console.log(error)
        })
      }).catch(() => {
        this.$$toast.fali('请稍后再试')
      })
    }
  },
  computed: {
    pirceSum () {
      return (number, pirce) => {
        let sum = number * pirce
        return sum
      }
    },
    orderPayContentHeight () {
      const val = this.orderPayList.length * 4
      return val
    },
    ...mapGetters(['currUserData'])
  },
  mounted () {
    this.getOrderPay()
    this.scroll = new Bscroll(this.$refs.orderPayShow, { mouseWheel: true, click: true, tap: true })
  },
  activated () {
    this.getOrderPay()
  }
}
</script>

<style lang='stylus' scoped>

.ordePay-box
  width: 7.5rem
  height: 10.8rem
  .orderPay-show
    height: 10rem
    padding: .3rem
    overflow: hidden
    .orderPay-content
      transition: 1s
      width: 100%
      .payContent
        width: 100%
        height: 3.5rem
        box-shadow: .1rem .1rem .2rem #ccc
        margin-top: .2rem
        border: .01rem solid #ccc
        border-radius: .3rem
        .payContent-title
          float: left
          margin: 5% 0 2.5%  0
          width: 56%
          height: .5rem
          text-align: center
          font-size: .26rem
          font-weight: 500
          color: #666
          line-height: .5rem
        .payContent-img
          float: left
          width: 30%
          height: 2rem
          margin: 5%  7%  1%  7%
          .img
            height: 100%
            width: 100%
            border-radius: .3rem
        .payContent-information
          float: left
          width: 44%
          height: 1.1rem
          margin: 1% 2%
          text-align: center
          line-height: .5rem
          .price
            font-size: .3rem
            margin-right: 2%
        .sum-price
          float: left
          width: 40%
          height: .5rem
          margin: 1% 5%
          text-align: center
          line-height: .5rem
          color: #999
          .sum
            color: #666
            font-size: .35rem
        .payContent-btns
          float: left
          width: 65%
          height: .5rem
          margin: 1% 5% 1% 35%
          text-align: center
          line-height: .5rem
          .btns
            margin: 0 2%
            font-size: .2rem
            float: left
            width: 26%
            height: .4rem
            border: .01rem solid #ccc
            border-radius: .1rem
            line-height: .4rem
            text-align: center
          .details
            color: #666
          .pay
            color: red
          .cancel
            color: #999
</style>
