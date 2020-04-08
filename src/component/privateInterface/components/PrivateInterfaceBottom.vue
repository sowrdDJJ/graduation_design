<template>
    <div class="contraner privateInterface-title">
      <div class="row">
        <div class="col-12 text-center">
            <a v-if='!privateInformations.state' href="javascript:;" class="btn  btn-light mx-1" @click="submisstionRequest('addFriend')">加好友</a>
            <a v-else href="javascript:;" class="btn btn-dark mx-1" @click="submisstionRequest('dialogue')">发消息</a>
        </div>
      </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { mapGetters } from 'vuex'
export default {
  name: 'PrivateInterfaceBottom',
  props: {
    privateInformations: Object
  },
  methods: {
    submisstionRequest (action) {
      if (action === 'dialogue') {
        this.$router.push(`/user/DialogueBox/${this.privateInformations.user_Id}`)
      } else {
        this.$stoer.dispatch('user/postUserOrderInfo', {
          url: '/postFriend',
          params: {
            firendId: this.privateInformations.user_Id,
            userId: this.currUserData.user_Id
          }
        }).then(() => {
          this.$toast.success('发送成功')
          this.$router.push('user/Dialogue')
        }).catch(err => {
          console.log(err)
          this.$toast.fail('系统维护中')
        })
      }
    }
  },
  computed: {
    ...mapGetters(['currUserData'])
  }
}
</script>

<style lang="stylus" scoped>
.privateInterface-title
  .out
    width: .8rem
    height: .6rem
    padding-right: .1rem
    line-height: .5rem
    .iconfont
      font-size: .5rem
      font-weight: 600
      color: white
  .privateInterface-tag
    color: white
    font-size: .5rem
</style>
