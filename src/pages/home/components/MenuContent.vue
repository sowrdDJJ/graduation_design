<template>
  <div class="menu-content-box">
    <ul>
      <li
      v-for="(item,index) of menuList"
      :key="index"
      class="menu-content-title"
      @click="clickChlidrenShow(item.chlidren,item.id)"
      >
        <span>{{item.title}}</span>
        <div v-if="item.chlidren" v-show="chlidrenShowId==item.id">
        <ul>
          <li  v-for="(e,i) of chlidrenShowArray" :key="i" class="menu-content-title-chlidren" @click="triggerSearch(e.title)">{{e.title}}</li>
        </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuContent',
  props: {
    menuList: Array
  },
  data () {
    return {
      chlidrenShowArray: [],
      chlidrenShowId: ''
    }
  },
  methods: {
    clickChlidrenShow (Array, id) {
      if (this.chlidrenShowId !== id) {
        this.chlidrenShowArray = Array
        this.chlidrenShowId = id
      } else {
        this.chlidrenShowId = 'none'
      }
    },
    triggerSearch (commodityName) {
      console.log(commodityName)
      this.$emit('commodityName', commodityName)
    }
  }
}
</script>

<style lang='stylus' scoped>
.menu-content-box
  height: 6rem
  .menu-content-title
    padding-top: .25rem
    margin-left: .4rem
    color: #666
    .menu-content-title-chlidren
      padding: .2rem 0 0 .4rem
      border-bottom: .01rem solid #d8d6d6
      color: #999
</style>
