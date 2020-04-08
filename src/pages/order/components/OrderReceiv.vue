<template>
  <div class="ordeReceiv-box">
    <div class="orderReceiv-show" ref="orderReceivShow">
        <div class="orderReceiv-content" :style="{'height':(orderReceivContentHeight + 'rem')}">
            <div class="receivContent" v-for="item of orderReceivList" :key="item.id">
              <div class="receivContent-img">
                  <img :src="item.imgUrl" class="img">
              </div>
               <div class="receivContent-title">
                  <span class="title">{{item.title}}</span>
              </div>
              <div class="receivContent-information">
                  <span class="price">价格：￥{{item.price}}</span>
                  <span class="number">数量：{{item.number}}</span>
                  <span class="size">型号：{{item.size}}</span>
              </div>
              <div class="sum-price">
                  合计：<span class="sum">￥{{pirceSum(item.price, item.number)}}</span>
              </div>
              <div class="receivContent-btns">
                  <ul>
                    <router-link :to="`orderReceivInformation/ReceivId=` + item.id">
                      <li class="btns details">查看物流</li>
                    </router-link>
                    <router-link to="/user/PasswordBtn">
                      <li class="btns Receiv" @click="transtionOrderNavigation(item.id)">确认收货</li>
                    </router-link>
                      <li class="btns cancel">退货</li>
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
import { mapGetters } from 'vuex'
import {mutations} from '@/utils/observable'
export default {
  name: 'OrderReceiv',
  data () {
    return {
      orderReceivList: []
    }
  },
  methods: {
    getOrderReceiv () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getUserOrderColumn',
        params: {
          action: 'Receiv'
        }
      }).then(resulte => {
        this.orderReceivList = resulte
      })
    },
    detailsBtn (id) {
      this.$router.push(`/commodity/id=` + id)
    },
    transtionOrderNavigation (id) {
      mutations.setPayId(id)
      mutations.setAction('Receiv')
      Bus.$emit('transtionOrderNavigation', 'OrderReceiv')
    }
  },
  computed: {
    pirceSum () {
      return (number, pirce) => {
        let sum = number * pirce
        return sum
      }
    },
    orderReceivContentHeight () {
      const val = this.orderReceivList.length * 4
      return val
    },
    ...mapGetters(['currUserData'])
  },
  mounted () {
    console.log(this.$route.params)
    this.getOrderReceiv()
    this.scroll = new Bscroll(this.$refs.orderReceivShow, { mouseWheel: true, click: true, tap: true })
  },
  activated () {
    this.getOrderReceiv()
  }
}
</script>

<style lang='stylus' scoped>
.ordeReceiv-box
  width: 7.5rem
  height: 10.8rem
  .orderReceiv-show
    overflow: hidden
    height: 10rem
    padding: .3rem
    .orderReceiv-content
      width: 100%
      .receivContent
        width: 100%
        height: 3.5rem
        box-shadow: .1rem .1rem .2rem #ccc
        border: .01rem solid #ccc
        border-radius: .3rem
        .receivContent-title
          float: left
          margin: 5% 0 2.5%  0
          width: 50%
          height: .5rem
          text-align: center
          font-size: .3rem
          font-weight: 500
          color: #666
          line-height: .5rem
        .receivContent-img
          float: left
          width: 35%
          height: 2rem
          margin: 5%  7.5%  1%  7.5%
          .img
            height: 100%
            width: 100%
            border-radius: .3rem
        .receivContent-information
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
        .receivContent-btns
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
          .Receiv
            color: red
          .cancel
            color: #999
</style>
