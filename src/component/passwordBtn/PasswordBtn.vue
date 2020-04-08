<template>
    <div class="payPassword">
      <div class="signOutPay">
        <span @click='outPassword' class="iconfont">&#xe61d;</span>
      </div>
      <div class="payPasswordShowBox">
        <van-password-input
        :value="value"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        />
      </div>
      <van-number-keyboard
      class="keyboard"
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      :hide-on-click-outside='false'
      />
    </div>
</template>

<script>
import { observable } from '@/utils/observable'
export default {
  name: 'PasswordBtn',
  data () {
    return {
      value: '',
      showKeyboard: true,
      orderList: []
    }
  },
  methods: {
    getSubmisstionOrder (e) {
      this.orderList = e
    },
    onInput (key) {
      this.value = (this.value + key).slice(0, 6)
      if (this.value.length === 6) {
        this.$store.dispatch('user/postUserOrderInfo', {
          url: '/postUserBillPay',
          params: {
            value: this.value,
            orderId: this.payId,
            action: this.action
          }
        }).then(this.combinationPassword)
      }
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    combinationPassword (resulte) {
      if (resulte) {
        if (this.action === 'pay' || this.action === 'ShoppingCar') {
          this.$router.push(`/user/Order/OrderReceiv`)
          this.$toast.success('支付成功')
        } else {
          this.$router.push(`/user/Order/OrderEvaluate`)
          this.$toast.success('收货成功')
        }
      } else {
        this.$toast.fail('密码错误')
      }
      this.value = ''
    },
    outPassword () {
      if (this.action === 'pay' || this.action === 'ShoppingCar') {
        this.$dialog.confirm({
          title: '是否取消支付',
          width: '320px'
        }).then(() => {
          this.$router.push(`/user/Order/OrderPay`)
          this.$toast.fail('支付失败')
        }).catch(() => {
        })
      } else {
        this.$dialog.confirm({
          title: '是否取消收货',
          width: '320px'
        }).then(() => {
          this.$router.push(`/personal/user=` + this.$route.params.UserId + `/Order/orderReceiv`)
          this.$toast.fail('收货失败')
        }).catch(() => {
        })
      }
    }
  },
  computed: {
    payId () {
      return observable.payId
    },
    action () {
      return observable.action
    }
  }
}
</script>

<style lang='stylus' scoped>
.payPasswordShowBox >>> .van-password-input
  box-sizing: border-box
  border: .01rem  solid #999
  padding: 1%
  margin: 5% 10%
  height: 1rem
  border-radius: .2rem
.payPasswordShowBox >>> .van-password-input__security
  height: 100%
  box-sizing: border-box
  padding: 1%
.payPasswordShowBox >>> .van-password-input__security li
  border: .01rem solid #bfbbbb
.payPassword >>> .van-key
  height: 1.3rem
  line-height: 1.3rem
  box-sizing: border-box
  border: .001rem solid #e6e6e6
 .payPassword
    z-index: 99
    position: fixed
    top: 0
    left: 0
    height: 13.2rem
    width: 100vw
    background: rgb(0,0,0)
    .payPasswordShowBox
      position: absolute
      top:3rem
      width: 100vw
      height: 2rem
      border: .02rem 0 solid #333
      background: white
    .keyboard
      position: absolute
      top: 5rem
    .signOutPay
      margin: .2rem .4rem
      width: 6.5%
      height: 1rem
      line-height: 1rem
      text-align: center
      .iconfont
        font-size: .4rem
        color: #fff
        font-weight: 600
        box-sizing: border-box
        padding-right: .07rem
</style>
