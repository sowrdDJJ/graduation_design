<template>
  <div class="area-content-box">
        <div class="area-content">
          <van-area
          :area-list="areaList"
          @confirm='sumissionArea'
          @cancel='cancelArea'
          value="110101" />
        </div>
  </div>
</template>

<script>
import areaList from 'js/area'
export default {
  name: 'Area',
  data () {
    return {
      areaList: areaList,
      areaData: {
        'province': '',
        'city': '',
        'county': ''
      }
    }
  },
  methods: {
    sumissionArea (e) {
      this.areaData.province = e[0].name
      this.areaData.city = e[1].name
      this.areaData.county = e[2].name
      this.$emit('areaData', this.areaData)
    },
    cancelArea () {
      this.$emit('cancelArea', false)
    }
  }
}
</script>

<style lang='stylus' scoped>
.area-content-box
  width: 100%
  height:100%
</style>
