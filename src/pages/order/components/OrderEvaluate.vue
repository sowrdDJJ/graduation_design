<template>
  <div class="ordeEvaluate-box">
    <div class="orderEvaluate-show" ref="orderEvaluateShow">
        <div class="orderEvaluate-content" :style="{'height':(orderEvaluateContentHeight + 'rem')}">
            <div class="evaluateContent" v-for="item of orderEvaluateList" :key="item.id">
              <div class="evaluateContent-img">
                  <img :src="item.imgUrl" class="img">
              </div>
               <div class="evaluateContent-title">
                  <span class="title">{{item.title}}</span>
              </div>
              <div class="evaluateContent-information">
                  <span class="price">价格：￥{{item.price}}</span>
                  <span class="number">数量：{{item.number}}</span>
                  <span class="size">型号：{{item.size}}</span>
              </div>
              <div class="sum-price">
                  合计：<span class="sum">￥{{pirceSum(item.price, item.number)}}</span>
              </div>
              <div class="evaluateContent-btns">
                  <ul>
                      <li class="btns details">查看物流</li>
                      <li class="btns evaluate">评价</li>
                  </ul>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapGetters } from 'vuex'
export default {
  name: 'OrderEvaluate',
  data () {
    return {
      orderEvaluateList: []
    }
  },
  methods: {
    getOrderEvaluate () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getUserOrderColumn',
        params: {
          action: 'evaluate'
        }
      }).then(resulte => {
        this.orderEvaluateList = resulte
      }).catch(error => {
        this.$totas(error)
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
    orderEvaluateContentHeight () {
      const val = this.orderEvaluateList.length * 4
      return val
    },
    ...mapGetters(['currUserData'])
  },
  mounted () {
    console.log(this.$route.params)
    this.getOrderEvaluate()
    this.scroll = new Bscroll(this.$refs.orderEvaluateShow, { mouseWheel: true, click: true, tap: true })
  },
  activated () {
    this.getOrderEvaluate()
  }
}
</script>

<style lang='stylus' scoped>
.ordeEvaluate-box
  width: 7.5rem
  height: 10.8rem
  .orderEvaluate-show
    overflow: hidden
    height: 10rem
    padding: .3rem
    .orderEvaluate-content
      width: 100%
      .evaluateContent
        overflow: hidden
        width: 100%
        height: 3.5rem
        box-shadow: .1rem .1rem .2rem #ccc
        border: .01rem solid #ccc
        border-radius: .3rem
        .evaluateContent-title
          float: left
          margin: 5% 0 2.5%  0
          width: 50%
          height: .5rem
          text-align: center
          font-size: .3rem
          font-weight: 500
          color: #666
          line-height: .5rem
        .evaluateContent-img
          float: left
          width: 35%
          height: 2rem
          margin: 5%  7.5%  1%  7.5%
          .img
            height: 100%
            width: 100%
            border-radius: .3rem
        .evaluateContent-information
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
        .evaluateContent-btns
          float: left
          width: 65%
          height: .5rem
          margin: 1% 5% 1% 55%
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
          .evaluate
            color: red
          .cancel
            color: #ccc
</style>
