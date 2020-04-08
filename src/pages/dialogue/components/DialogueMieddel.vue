<template>
    <div class="dialogueMiddel-box">
      <transition-group enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" mode="out-in" :dropzone="1000">
        <div class="dialogueMiddel-content" v-for="item of dialogueContent" :key="item.id">
          <router-link :to="`/user/DialogueBox/${item.id}`">
            <div class="dialogueMiddel-userRelationHeadImg">
                <img :src="item.userRelationHeadImg" class="userRelationHeadImg">
            </div>
            <div class="dialogueMiddel-userData">
              <div class="userName">
                  <span>{{item.userName}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </transition-group>
    </div>
</template>

<script>
import Bus from 'bus'
import { mapGetters } from 'vuex'
export default {
  name: 'DialogueMiddel',
  data () {
    return {
      keyWord: null,
      dialogueContent: [],
      dialogueContentAll: []
    }
  },
  props: {
    dialogueContentAllList: Array
  },
  created () {
    Bus.$on('dialogueSearchKeyWord', this.getKeyWord)
  },
  watch: {
    keyWord: {
      handler (newValue) {
        this.screenDialogue(newValue)
      },
      deep: true
    },
    dialogueContentAllList: {
      handler (newValue) {
        this.dialogueContentAll = newValue
        this.dialogueContent = this.dialogueContentAll
        console.log(this.dialogueContent)
      }
    }
  },
  methods: {
    screenDialogue (keyWord) {
      let dislogueContentNew = []
      dislogueContentNew = this.dialogueContentAll.filter(e => e.userName.indexOf(this.keyWord) > -1)
      this.dialogueContent = dislogueContentNew
    },
    getKeyWord (e) {
      this.keyWord = e
    }
  },
  computed: {
    ...mapGetters(['currUserData'])
  }
}
</script>

<style lang='stylus' scoped>
--box-height = 10.8rem
--box-width = 7.5rem
--content-height = 1.3rem
--content-width = 7.5rem
--contentImg-height = 1.1rem
--contentImg-width = 1.1rem
--contentUserName-height = .7rem
--contentUserName-width = 6.4rem

.dialogueMiddel-box
  height: --box-height
  width: --box-width
  .dialogueMiddel-content
    display: flex
    justify-content: start
    height: --content-height
    width: --content-width
    box-sizing: border-box
    padding: .1rem
    .dialogueMiddel-userRelationHeadImg
      float: left
      width: --contentImg-width
      height: --contentImg-height
      .userRelationHeadImg
        border-radius: .2rem
        width: 100%
        height: 100%
    .dialogueMiddel-userData
      float: left
      margin-left: .3rem
      width: --contentUserName-height
      height: --contentUserName-width
      .userName
        color: #333
        font-size: .3rem
        width: --contentUserName-width
        height: --contentUserName-height
        line-height: --contentUserName-height
        box-sizing: border-box
        padding: .1rem
</style>
