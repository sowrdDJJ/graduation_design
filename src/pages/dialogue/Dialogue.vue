<template>
  <div class="dialogue">
    <header class="dialogue-header">
      <dialogue-head></dialogue-head>
    </header>
    <main class="dialogue-main">
      <dialogue-middel :dialogueContentAllList='dialogueContentAll'></dialogue-middel>
    </main>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft" >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import DialogueHead from './components/DialogueHead'
import DialogueMiddel from './components/DialogueMieddel'
// import Axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'dialogue',
  components: {
    DialogueHead,
    DialogueMiddel
  },
  data () {
    return {
      dialogueContentAll: []
    }
  },
  methods: {
    getDislogueData () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/getUserDialogues'
      }).then(resulte => {
        console.log(resulte)
        this.dialogueContentAll = resulte
      }).catch(error => {
        this.$toast.fail('请稍后...')
        console.log(error)
      })
    }
  },
  computed: {
    ...mapGetters(['currUserData'])
  },
  mounted () {
    this.getDislogueData()
  },
  activated () {
    this.getDislogueData()
  }
}
</script>

<style lang='stylus' scoped>
--window-width = 7.5rem
--window-height = 12.3rem
--header-height = 1.5rem
--header-width = 7.5rem
--main-height = 10.8rem
--main-width = 7.5rem

.dialogue
  z-index: 3
  background: white
  height: 12.3rem
  width: 7.5rem
  .dialogue-header
    width: --header-width
    height: --header-height
  .dialogue-main
    width: --main-width
    height: --main-height
</style>
