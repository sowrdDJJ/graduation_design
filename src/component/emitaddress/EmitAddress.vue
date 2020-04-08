<template>
  <div class="emitaddress-box">
    <emitAddress-header></emitAddress-header>
    <div class="emitAddres-data">
      <van-address-edit
      :area-list="areaList"
      :address-info='emitAddressData'
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :show-delete='false'
      />
    </div>
  </div>
</template>

<script>
import areaList from 'js/area'
import EmitAddressHeader from './components/Header'
import { mapState } from 'vuex'
export default {
  name: 'emitAddress',
  components: {
    EmitAddressHeader
  },
  data () {
    return {
      areaList,
      searchResult: [],
      emitAddressData: {},
      changeState: true
    }
  },
  methods: {
    onSave (content) {
      if (content !== this.emitAddressData) {
        this.emitAddressData = content
        this.submissionEmitAddressData()
      } else {
        this.$toast('保存成功')
        this.$router.push(`/user/EmitAddress/payId=${this.$route.params.payId}`)
      }
    },
    onDelete () {
      this.$toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    },
    getEmitAddressData () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getEmitAddress',
        params: {
          payId: this.$route.params.payId
        }
      }).then(resulte => {
        if (resulte) {
          this.emitAddressData = resulte
        }
      })
    },
    submissionEmitAddressData () {
      this.$store.dispatch('user/postUserOrderInfo', {
        url: '/postEmitAddress',
        params: {
          payId: this.$route.params.payId,
          emitAddressInformation: this.emitAddressData
        }
      }).then(resulte => {
        if (resulte) {
          this.$toast('保存成功')
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        } else {
          this.$toast('保存失败')
        }
      })
    }
  },
  mounted () {
    this.getEmitAddressData()
  },
  computed: {
    ...mapState(['currUserData'])
  }
}
</script>

<style lang='stylus' scoped>
.emitaddress-box
  z-index: 100
  position: fixed
  top: 0
  width: 100vw
  height: 13.3rem
  background: white
  .emitAddres-data
    position: absolute
    top: 1.5rem
    left: 5vw
    width: 90vw
    height: 10rem
</style>
