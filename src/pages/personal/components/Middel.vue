<template>
  <div>
     <div class="personal-middel">
      <div class="user-head">
        <img class="user-head-img" :src="`${currUserDataUser_Img}`" alt="头像">
      </div>
      <div class="presonal-order">
        <router-link tag="div" to='/user/Order' class="presonal-order-tag">
            <span>
                我的订单
            </span>
        </router-link>
      </div>
      <div class="personal-shoppingCar">
          <router-link tag="div" to='/user/ShoppingCar' class="personal-shoppingCar-btn" >
            <span>我的购物车</span>
          </router-link>
      </div>
      <div class="personal-collection" v-show="optionShowCollection">
        <transition-group
        name="custom-classes-transition"
        enter-active-class="animated bounceInLeft"
        leave-active-class="animated bounceOutLeft"
        :duration='1000'>
        <div class="personal-collention-btn" :key="0">
          <div class="personal-collention-btn-object">
            <span class="iconfont">我的收藏</span>
          </div>
        </div>
            <personal-collection :collection='collectionList' :colloectionImg='colloectionImg' v-show="optionShowCollection" :key="1"></personal-collection>
        </transition-group>
      </div>
     </div>
  </div>
</template>

<script>
import PersonalCollection from './Collection'
import { mapGetters } from 'vuex'
import Bus from 'bus'
export default {
  name: 'PersonalMiddel',
  components: {
    PersonalCollection
  },
  data () {
    return {
      optionShowCollection: true,
      optionShowShoppingCar: false,
      currOptionPosition: 0,
      currUserDataUser_Img: ''
    }
  },
  props: {
    collectionList: Array,
    colloectionImg: Array
  },
  methods: {
    setupdateUserHeadImg (e) {
      this.currUserDataUser_Img = e
    }
  },
  computed: {
    ...mapGetters(['currUserData'])
  },
  created () {
    Bus.$on('updateUserHeadImg', this.setupdateUserHeadImg)
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl';
--window-width = 7.5rem
--middel-height = 10.3rem
--middel-userHead-height = 2.5rem
--middel-userHead-width = 2.5rem
--middel-order-height = 1.5rem
--middel-order-width = 3rem
--middel-shoppingCar-height = 1.5rem
--middel-shoppingCar-width = 3rem
--middel-collection-width = 7.5rem
--mddel-collection-height = 4.5rem

.personal-middel
  display: flex
  flex-wrap: wrap
  justify-content: space-around
  align-content: space-around
  height: --middel-height
  width: --window-width
  .user-head
    height: --middel-userHead-height
    width: --window-width
    display: flex
    justify-content: center
    .user-head-img
      height: --middel-userHead-height
      width: --middel-userHead-width
      border-radius: 1.5rem
      box-shadow: .3rem .3rem 1rem #888
  .presonal-order
    width: --middel-order-width
    height: --middel-order-height
    background: $bgColorFifth
    border-radius: .3rem
    .presonal-order-tag
      width: 100%
      height: 100%
      font-size: .2rem
      box-sizing: border-box
      line-height: --middel-order-height
      text-align: center
      font-weight: 600
      color: white
  .personal-shoppingCar
    background: $bgColorFifth
    width: --middel-shoppingCar-width
    height: --middel-shoppingCar-height
    border-radius: .3rem
    .personal-shoppingCar-btn
      width: 100%
      height: 100%
      font-size: .2rem
      box-sizing: border-box
      line-height: --middel-shoppingCar-height
      text-align: center
      color: white
      font-weight: 600
  .personal-collection
    background: white
    height: --mddel-collection-height
    width: --middel-collection-width
    box-shadow: .2rem .2rem 1rem #888
    border-radius: 2vw
    .personal-collention-btn
      display: flex
      width: 3rem
      height: 1rem
      .personal-collention-btn-object
        width: 100%
        height: 100%
        box-sizing: border-box
        line-height: .5rem
        text-align: center
        padding: .3rem .2rem
        .iconfont
          font-weight: 600
          color: #ccc
          font-size: .5rem

</style>
