<template>
  <div>
    <div class="commodity-middel-box">
      <div class="commodity-middel-first">
        <div class="commodity-name">
          <span>{{commodityInformation.title}}</span>
        </div>
        <div class="commodity-img">
          <img :src="commodityInformation.imgUrl" @click="imgShow(commodityInformation.imgUrl)">
        </div>
        <div class="commodity-size">
          <ul>
            <li class="commodity-size-title">尺寸：</li>
            <li class="commodity-size-content" v-for='(item,index) of sizeList' :key="index" @click="commoditySize(index,item)"  :class='{sizeSelection: index === selectionId}'>
              {{item}}
            </li>
          </ul>
        </div>
      </div>
      <div class="commodity-middel-box-second">
        <div class="commodity-middel-box-third">
          <div class="commodity-price">
            <span class="commodity-price-title">价格:</span>
            <br/><br/>
            <span class="commodity-price-content">￥{{commodityData.price}}</span>
          </div>
          <div class="commodity-number">
            <div class="commodity-reduce-value" @click="commodityNumberValue('reduec')">-</div>
            <div class="commodity-number-value" v-text="NumberValue"></div>
            <div class="commodity-add-value" @click="commodityNumberValue('add')">+</div>
          </div>
        </div>
        <div class="commodity-middel-box-fifth">
          <div class="commodity-evaluate">
            <div class="commodity-evaluate-title">
              <span>推荐度：</span>
            </div>
            <van-rate
            class="commodity-evaluate-content"
            v-model="commodityGuaranteeValue"
            allow-half
            void-icon="star"
            void-color="#eee"
            :readonly='true'
            />
          </div>
          <div class="commodity-ovder" @click="commodityAction('ovder')">
            <span>立即购买</span>
          </div>
          <div class="commodity-shoppingCar" @click="commodityAction('shoppingCar')">
            <span>加入购物车</span>
          </div>
          <div class="commodity-conllection" @click="commodityAction('conllection')">
            <span v-if="commodityData.conllectionState">
              <span class="iconfont">&#xe8c3;</span>
              已收藏
            </span>
            <span v-else>
              <span class="iconfont">&#xe8ab;</span>
                收藏
            </span>
          </div>
        </div>
        <div class="commodity-sizeImg" v-if="this.commodityInformation.sizeImg">
          <p class="commodity-sizeImg-title">尺码详情:</p>
          <img :src="commodityInformation.sizeImg" alt="尺寸图片" @click="imgShow(commodityInformation.sizeImg)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from 'bus'
import capSize from '@/assets/img/capSize.jpg'
import clothesSize from '@/assets/img/clothesSize.jpg'
import {mutations} from '@/utils/observable'
import { mapGetters } from 'vuex'
export default {
  name: 'CommodityMiddel',
  data () {
    return {
      commodityInformation: [],
      NumberValue: 1,
      sizeList: ['S', 'M', 'L', 'XL', 'XXL', '常规'],
      selectionId: 0,
      commodityData: {
        'commodity_Class': '雕塑手办',
        'conllectionState': true,
        'id': '0002',
        'imgUrl': '',
        'number': 1,
        'price': '',
        'state': false,
        'title': '',
        'size': ''
      },
      commodityGuaranteeValue: 4,
      timer: null
    }
  },
  created () {
    Bus.$on('commodityInformation', this.commodityInformationcarrier)
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    commodityInformationcarrier (e) {
      this.commodityInformation = e[0]
      this.commodityData.id = this.commodityInformation.id
      this.commodityData.conllectionState = this.commodityInformation.conllectionState
      this.commodityData.imgUrl = this.commodityInformation.imgUrl
      this.commodityData.price = this.commodityInformation.price
      this.commodityData.title = this.commodityInformation.title
      this.NumberValue = this.commodityData.number
      this.sizeList = this.sizeList.filter(e => {
        if (this.commodityInformation.commodity_Presonality.indexOf('帽子') >= 0 ||
        (this.commodityInformation.commodity_Presonality.indexOf('卫衣&夹克')) >= 0 ||
        (this.commodityInformation.commodity_Presonality.indexOf('T恤')) >= 0 ||
        (this.commodityInformation.commodity_Presonality.indexOf('LPL X NIKE')) >= 0 ||
        (this.commodityInformation.title.indexOf('帽')) >= 0) {
          if (this.commodityInformation.title.indexOf('帽') >= 0) {
            this.commodityInformation.sizeImg = capSize
          } else {
            this.commodityInformation.sizeImg = clothesSize
          }
          if (e !== '常规') {
            return true
          } else {
            return false
          }
        } else {
          if (e === '常规') {
            return true
          } else {
            return false
          }
        }
      })
      this.commodityData.size = this.sizeList[0]
      this.sizeList.forEach((sizeListelement, i) => {
        if (e.size === sizeListelement) {
          this.selectionId = i
        }
      })
    },
    commodityNumberValue (state) {
      if (state === 'add') {
        this.NumberValue < 99 ? this.NumberValue += 1 : this.NumberValue = this.NumberValue
      } else {
        this.NumberValue > 1 ? this.NumberValue -= 1 : this.NumberValue = this.NumberValue
      }
      this.commodityData.number = this.NumberValue
    },
    commoditySize (index, item) {
      const currendSize = this.sizeList.filter(e => {
        if (e === item) {
          return e
        }
      })
      this.commodityData.size = currendSize
      this.selectionId = index
    },
    commodityAction (action) {
      if (action === 'shoppingCar') {
        this.commodityData.commodityActionState = 'shoppingCar'
        if (this.token) {
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true
          })
          const informationCommodityData = {
            number: this.commodityData.number,
            size: this.commodityData.size,
            commodityId: this.commodityData.id
          }
          this.$store.dispatch('user/postUserOrderInfo', {
            url: '/postUserShoppingCar',
            params: {
              informationCommodityData: informationCommodityData,
              actionStyle: this.commodityData.commodityActionState
            }
          }).then(resulte => {
            this.judgeJoin(resulte)
          })
        } else {
          this.$router.push('/Account/Login')
        }
      } else if (action === 'ovder') {
        this.commodityData.commodityActionState = 'ovder'
        const informationCommodityData = {
          number: this.commodityData.number,
          size: this.commodityData.size,
          commodityId: this.commodityData.id
        }
        if (this.token) {
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true
          })
          this.$store.dispatch('user/postUserOrderInfo', {
            url: '/postUserOrderColumn',
            params: {
              commodity: informationCommodityData,
              action: 'addpay'
            }
          }).then(resulte => {
            this.jumpPay(resulte)
          })
        } else {
          this.$router.push('/Account/Login')
        }
      } else {
        if (this.token) {
          this.commodityData.conllectionState = !this.commodityData.conllectionState
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true
            })
            this.commodityData.commodityActionState = 'conllection'
            this.$store.dispatch('user/postUserOrderInfo', {
              url: '/postUserColloection',
              params: {
                commodity: this.commodityData.id
              }
            }).then(resulte => {
              this.judgeJoin(resulte)
            }).catch(err => {
              console.log(err)
              this.$toast.fail('请稍后...')
            })
          }, 1000)
        } else {
          this.$router.push('/Account/Login')
        }
      }
    },
    jumpPay (res) {
      if (res) {
        this.$toast.clear()
        mutations.setPayId(res.orderNumber)
        mutations.setAction('pay')
        this.$router.push('/user/PasswordBtn')
      } else {
        this.$toast.clear()
        this.$toast.fail('系统繁忙，请稍后再支付')
      }
    },
    judgeJoin (res) {
      if (res) {
        this.$toast.clear()
        this.$toast.success('操作成功')
      } else {
        this.$toast.clear()
        this.$toast.fail('请稍后...')
      }
    },
    imgShow (img) {
      const imgData = []
      imgData.push(img)
      Bus.$emit('showImgData', imgData)
      Bus.$emit('showImgState', true)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl';
--main-height = 12.03rem
--main-width = 7.5rem
--main-first-height = 6rem
--main-first-width = 7.5rem
--main-second-width = 7.5rem
--main-second-height = 5.43rem
--main-title-height = 1rem
--main-title-wdith = 6.4rem
--main-img-width = 4.5rem
--main-img-height = 4.5rem
--main-size-height = 1rem
--main-size-width = 5.7rem

.commodity-middel-box
  width: --main-width
  height: --main-height
  background: white
  border-top-left-radius: .9rem
  border-top-right-radius: .9rem
  .commodity-middel-first
    height: --main-first-height
    width: --main-first-width
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-content: space-around
    .commodity-name
      width: --main-title-wdith
      height: --main-title-height
      line-height: --main-title-height
      color: #666
      font-size: .3rem
      font-weight: 600
      text-align: center
    .commodity-img
      overflow: hidden
      height: --main-img-height
      width: --main-img-width
      box-shadow: .2rem .0rem .5rem #c1acb2
      img
        height: 100%
        width: 100%
    .commodity-size
      height: --main-size-height
      width: --main-size-width
      min-width: --main-size-width
      box-sizing: border-box
      padding: .3rem
      text-align: center
      line-height: .5rem
      .commodity-size-title
        float: left
        height: --main-size-height
        width: 20%
      .commodity-size-content
        float: left
        height: 100%
        width: 14%
        margin-left: 1%
        box-shadow: 0.1rem 0.1rem 0.2rem #888;
      .sizeSelection
        background: $bgColorFirst
        color: white
  .commodity-middel-box-second
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    align-content: space-around
    width: --main-second-width
    min-height: --main-second-height
    height: auto
    background:  $bgColorFirst
    border-radius: .5rem .5rem 0 0
    padding-top: .3rem
    margin-top: .3rem
    .commodity-middel-box-third
      display: flex
      justify-content: center
      flex-wrap: wrap
      align-content: center
      padding: .2rem 0
      width: 40%;
      height: 50%
      background: $bgColorSecond
      border-radius: .3rem
      .commodity-price
        width: 85%
        height: 1.3rem
        margin: .3rem
        .commodity-price-title
          color: white
          font-size: .4rem
        .commodity-price-content
          margin-left: .1rem
          color: white
          font-size: .6rem
      .commodity-number
        position: relative
        width: 85%
        height: 1.3rem
        color: white
        font-size: .4rem
        font-weight: 400
        border-radius: .1rem
        background: white
        .commodity-reduce-value
          position: absolute
          top: 0
          left: 0
          width: 30%
          height: 100%
          line-height: 1.3rem
          text-align: center
          background: $bgColorThird
          border-top-left-radius: .1rem
          border-bottom-left-radius: .1rem
        .commodity-number-value
          position: absolute
          top: 0
          left: 30%
          width: 40%
          height: 100%
          line-height: 1.3rem
          text-align: center
          color: #666
        .commodity-add-value
          position: absolute
          top: 0
          right: 0
          width: 30%
          height: 100%
          line-height: 1.3rem
          text-align: center
          background: $bgColorThird
          border-top-right-radius: .1rem
          border-bottom-right-radius: .1rem
    .commodity-middel-box-fifth
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-content: space-around
      width: 40%
      height: 60%
      .commodity-evaluate
        margin-bottom: .1rem
        width: 100%
        height: 20%
        color: white
        font-size: .4rem
        font-weight: 500
        .commodity-evaluate-content
          margin-top: 10%
      .commodity-ovder
        border-radius: .3rem
        margin-bottom: .1rem
        width: 100%
        height: 1rem
        background: $bgColorFourth
        color: #fff
        text-align: center
        line-height: 1rem
      .commodity-shoppingCar
        border-radius: .3rem
        margin-bottom: .1rem
        width: 100%
        height: 1rem
        background: $bgColorThird
        color: #fff
        text-align: center
        line-height: 1rem
      .commodity-conllection
        border-radius: .3rem
        width: 100%
        height: 1rem
        color: #fff
        font-size: .2rem
        text-align: center
        line-height: 1rem
        .iconfont
          font-size: .8rem
          color: #ffeb3b
    .commodity-sizeImg
      margin-top: .1rem
      height: 50%
      width: 80%
      .commodity-sizeImg-title
        color: white
        font-size: .3rem
        font-weight: 600
        margin-bottom: .1rem
      img
        height: 80%
        width: 100%
</style>
