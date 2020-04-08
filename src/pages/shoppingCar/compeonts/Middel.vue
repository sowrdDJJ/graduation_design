<template>
  <div class="shoppingCar-middel" >
    <div class="shoppingCar-middel-content" ref="shoppingCarCommodity">
      <div :style="{'height':(wapperHeight +'rem')}">
        <ul>
            <li class="shoppingCar-commodity-T" v-for="item of commodityList" :key="item.shoppingCar_Id" >
              <div class="shoppingCar-middel-commodity" >
                <router-link  :to="`/personal/user=`+(currUserId) +`/commodityId=`+item.id">
                  <div class="shoppingCar-middel-commodity-img">
                      <img class="img" :src="item.imgUrl" >
                  </div>
                  <div class="shoppingCar-middel-commodity-title">
                      <span v-cloak>{{item.title}}</span>
                  </div>
                </router-link>
                  <div class="shoppingCar-middel-commodity-parameter">
                      <div class="shoppingCar-middel-commodity-size" @click="showOptionSizeFs(item.size)">
                          <span>规格:{{item.size}}</span>
                              <van-overlay :show="showOptionSize">
                                <div class="wrapper" @click.stop>
                                  <van-picker :columns="sizeListShow"  @change='getChangeSize'/>
                                  <van-button class="btnSize" @click="setChangeSize(item)" type="danger">确定</van-button>
                                </div>
                              </van-overlay>
                      </div>
                          <div class="shoppingCar-middel-commodity-price">
                              <span v-cloak>${{item.price}}</span>
                          </div>
                  </div>
                  <div class="shoppingCar-middel-commodity-Number">
                      <div class="reduce-btn" @click="commodityNumberComputed('red',item.id)">-</div>
                      <span class="Number-value" v-text="item.number"></span>
                      <div class="add-btn" @click="commodityNumberComputed('add',item.id)">+</div>
                  </div>
                  <div class="shoppingCar-middel-commodity-option" >
                    <van-checkbox
                    v-model="item.state"
                    checked-color="red"
                    class="commodity-option"
                    ></van-checkbox>
                  </div>
              </div>
            </li>
            <li class="shoppingCar-commodity-F" v-if="!commodityList.length">
              <span v-text="'空空如也'" v-cloak></span>
            </li>
        </ul>
      </div>

    </div>
    <van-row
    class="shoppingCar-middel-navigataion"
    type="flex"
    justify="space-between">
      <van-col class="commodity-optionAll">
        <van-checkbox
        class="commodityOptionAll-btn"
        v-model="commoidtyOption"
        @click="commodityOptionAllFs"
        checked-color="red"
        ></van-checkbox>
      </van-col>
      <van-col class="commodity-price-computed">
        <van-row
        type="flex"
        justify="space-between">
        <van-col>合计:</van-col>
        <van-col>{{commodityPriceSum}}</van-col>
        <a href="javascript:;" @click="submisstionOrder()">
        <van-button
        class="btns"
        color="rgb(214, 166, 90)"
        :round='true'
        size="small">
        结算</van-button>
        </a>
        </van-row>
      </van-col>
    </van-row>
    <router-view></router-view>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Bus from 'bus'
import Axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'ShoppingCarMiddel',
  data () {
    return {
      commoidtyOption: true,
      commoidtyDataList: [],
      commodityPriceSumVal: 0,
      wapperHeight: 0,
      currUserId: this.$route.params.UserId,
      orderList: [],
      showOptionSize: false,
      sizeList: ['S', 'M', 'L', 'XL', 'XXL', '常规'],
      sizeListShow: [],
      changeSize: ''
    }
  },
  props: {
    commodityList: Array
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.shoppingCarCommodity, { mouseWheel: true, click: true, tap: true })
  },
  methods: {
    getChangeSize (picker, value, index) {
      this.changeSize = value
    },
    setChangeSize (object) {
      this.showOptionSize = false
      object.size = this.changeSize
    },
    showOptionSizeFs (object) {
      this.showOptionSize = !this.showOptionSize
      this.sizeListShow = this.sizeList.filter(e => {
        if (object === '常规') {
          if (e === '常规') {
            return true
          } else {
            return false
          }
        } else {
          if (e !== '常规') {
            return true
          } else {
            return false
          }
        }
      })
    },
    commodityNumberComputed (style, id) {
      let parameter = {
        'style': style,
        'id': id
      }
      this.$emit('commodityNumberChange', parameter)
    },
    commodityOptionAllFs () {
      this.commoidtyOption = !this.commodityOptionState
      this.commodityList.forEach(e => {
        e.state = this.commoidtyOption
      })
    },
    submisstionOrder () {
      this.orderList = this.commodityList.filter((e) => e.state === true)
      Axios.post('http://192.168.43.102:3000/postUserShoppingCar', {
        userId: this.currUserData.user_Id,
        data: this.orderList,
        actionStyle: 'check'
      })
        .then(this.passwordInput)
    },
    passwordInput (res) {
      res = res.data
      if (res.ret) {
        this.$store.dispatch('orderList', res.orderIdlist)
        this.$router.push(`/personal/user=` + this.currUserData.user_Id + `/shoppingCar/passwordBtn/action=ShoppingCar`)
      }
    }
  },
  computed: {
    commodityPriceSum () {
      let sumPrice = 0
      this.commodityList.forEach(e => {
        if (e.state === true) {
          sumPrice += (e.number * e.price)
        }
      })
      return sumPrice
    },
    commodityOptionState () {
      return this.commodityList.every(e => {
        return e.state
      })
    },
    commodityStateDataList () {
      let list = []
      this.commodityList.forEach(e => {
        list.push(e.state)
      })
      return list
    },
    ...mapGetters(['currUserData'])
  },
  watch: {
    commodityOptionState () {
      this.commoidtyOption = this.commodityOptionState
      Bus.$emit('commodityListChange', this.commodityStateDataList)
    },
    commodityList () {
      this.wapperHeight = this.commodityList.length * 3.3
    }
  }
}
</script>

<style lang='stylus' scoped>
--window-width = 7.5rem
--main-height = 11rem
--content-height = 9.5rem
--content-width = 7.5rem
--commodity-height = 2.5rem
--commodity-width = 7rem
--navigataion-width = 7.5rem
--navigataion-hegiht = 1.5rem

.shoppingCar-middel-commodity-option >>> .van-icon
  border: 1px solid #999;
.commodityOptionAll-btn >>> .van-icon
  border: 1px solid #999;
.shoppingCar-middel-commodity-option >>> .van-checkbox
  height: .5rem
.shoppingCar-middel
  display: flex
  flex-wrap: wrap
  justify-content: center
  width: --window-width
  height: --main-height
  .shoppingCar-middel-content
    height: --content-height
    width: --content-width
    overflow: hidden
    .shoppingCar-middel-commodity
      width: --commodity-width
      height: --commodity-height
      box-sizing: border-box
      padding: .2rem
      margin: .3rem 0
      background: rgba(230, 228, 228, 0.78)
      border-radius: .3rem
      .shoppingCar-middel-commodity-img
        float: left
        height: 100%
        width: 35%
        box-sizing: border-box
        padding: .3rem
        .img
          borde-radius: .2rem
          width: 100%
          height: 100%
      .shoppingCar-middel-commodity-title
        float: left
        height: 30%
        width: 65%
        text-align: center
        font-size: .3rem
        font-weight: 600
        line-height: .6rem
        color: #666
      .shoppingCar-middel-commodity-parameter
        float: left
        height: 30%
        width: 30%
        text-align: center
        font-size: .3rem
        font-weight: 600
        line-height: .6rem
        color: #666
        .wrapper
          position: absolute
          top: 30%
          width: 100%
          .btnSize
            width: 100%
            height: 1rem
      .shoppingCar-middel-commodity-Number
        float: left
        height: 50%
        width: 20%
        font-size: .3rem
        font-weight: 600
        line-height: 1rem
        color: #333
        border-radius: .1rem
        border: 1px solid #666
        .reduce-btn
          float: left
          width: 30%
          height: 100%
          font-size: .4rem
          text-align: center
        .Number-value
          float: left
          width: 40%
          height: 100%
          font-size: .4rem
          text-align: center
        .add-btn
          float: left
          width: 30%
          height: 100%
          font-size: .4rem
          text-align: center
      .shoppingCar-middel-commodity-option
        float: left
        height: 50%
        width: 9%
        text-align: center
        padding-left: .2rem
        padding-top: .3rem
        box-sizing: border-box
  .shoppingCar-middel-navigataion
    display: flex
    width: --navigataion-width
    height: --navigataion-hegiht
    background: rgb(255, 242, 242)
    .commodity-optionAll
      width: 30%
      height: 100%
      box-sizing: border-box
      padding: .25rem
      .commodityOptionAll-btn
        width: 25%
        height: 83%
    .commodity-price-computed
      width: 50%
      height: 100%
      box-sizing: border-box
      padding: .25rem
      line-height: .6rem
      font-size: .3rem
      .btns
        margin-top: .1rem
</style>
