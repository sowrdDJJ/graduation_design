<template>
  <div class="privateInterface-box">
    <div class="frostedGlass"></div>
    <div class="privateInterface-head">
        <privateInterface-head :privateInformations='privateInformations'></privateInterface-head>
    </div>
    <div class="privateInterface-mieddle">
        <privateInterface-mieddle :privateInformations='privateInformations'></privateInterface-mieddle>
    </div>
    <div class="privateInterface-bottom">
      <PrivateInterface-bottom :privateInformations='privateInformations'></PrivateInterface-bottom>
    </div>
  </div>
</template>

<script>
import privateInterfaceHead from './components/PrivateInterfaceHead'
import privateInterfaceMieddle from './components/PrivateInterfaceMiddle'
import PrivateInterfaceBottom from './components/PrivateInterfaceBottom'
import { mapGetters } from 'vuex'
export default {
  name: 'privateInterFace',
  data () {
    return {
      privateInformations: {}
    }
  },
  components: {
    privateInterfaceHead,
    privateInterfaceMieddle,
    PrivateInterfaceBottom
  },
  methods: {
    getPrivateInformations () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getFriend',
        params: {
          selectAccountNumber: this.$route.params.userId,
          actionState: 'select'
        }
      }).then(resulte => {
        if (resulte) {
          console.log(resulte)
          this.privateInformations = resulte[0]
        } else {
          this.$router.go(-1)
        }
      }).catch(err => {
        console.log(err)
        this.$router.go(-1)
      })
    }
  },
  computed: {
    ...mapGetters(['currUserData'])
  },
  mounted () {
    console.log(this.$route.params.selectAccountNumber)
    this.getPrivateInformations()
  }
}
</script>

<style lang='stylus' scoped>
.privateInterface-box
  width: 100vw
  height: 13.3rem
  background-size: 13.3rem 100%
  .privateInterface-head
    position: relative
    top: 0
    width: 100vw
    height: 10%
    box-sizing: border-box
    padding: .3rem
    background: rgba(1,1,1,0.7)
  .privateInterface-mieddle
    width: 100vw
    height: 70%
    box-sizing: border-box
  .privateInterface-bottom
    width: 100vw
    height: 20%
    box-sizing: border-box
  .frostedGlass
    position: absolute
    top: 0
    height: 100%
    width: 100%
    background: url('https://game.gtimg.cn/images/lol/act/a20191028senna/senna_1920_1080.jpg') center no-repeat
    filter: blur(.05rem)
    transform: translate3d(0)
    background-size: 13.3rem 100%
</style>
