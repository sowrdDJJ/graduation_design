<template>
  <div class="dialogueBox-contrainer">
    <div class="dialogueBox-head">
      <div class="head-out" @click="outdialogue">
        <span class="iconfont">&#xe61d;</span>
      </div>
      <div class="head-userTitle">
        <span class="userTitle">{{dialogueBoxName}}</span>
      </div>
    </div>
    <div class="dialogueBox-dialogueContent" ref="dialogueContent">
        <div class="dialogueContent-warpped" ref="dialogueContentWarpped" :style="{'height': dialogueContentWarppedHeight + 'rem'}">
          <div v-for="item of bulleList" :key="item.id">
            <div class="dialogueContent-bulleReceive" v-if="item.bulleObject === 'receive'">
                <div class="bulleReceive-img">
                <img :src="item.userHeadImg"  class="img">
                </div>
                <span class="bulleReceive-userName">{{item.userName}}</span>
                <div class="bulleReceive-container">
                  <span class="bulleReceive-content">{{item.userBulleContent}}</span>
                </div>
            </div>
            <div class="dialogueContent-bulleSend" v-else>
                <div class="bulleSend-img">
                <img :src="item.userHeadImg"  class="img">
                </div>
                <span class="bulleSend-userName">{{item.userName}}</span>
                <div class="bulleSend-container">
                  <span class="bulleSend-content">{{item.userBulleContent}}</span>
                </div>
            </div>
          </div>
        </div>
    </div>
    <div class="dialogueBox-userInput">
      <div class="userInput-InputBox">
            <input type="text" class="InputBox-contnet" v-model="currUserDataInformation.userDialogueContent">
      </div>
      <div class="userInput-sendBtn">
        <a href="javascript:" class="sendBtn" @click="sendInformation">发送</a>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapGetters } from 'vuex'
export default {
  name: 'DialogueBox',
  data () {
    return {
      currUserDataInformation: {
        userId: '',
        userName: '',
        dialogueObject: this.$route.params.objectUserId,
        userHeadImg: '',
        userDialogueContent: ''
      },
      bulleList: [],
      inputDialogueBoxContentData: [],
      dialogueBoxName: '',
      compressFrequency: 0,
      id: '',
      toalHeight: 0,
      scrollY: 0
    }
  },
  methods: {
    compressFunction  (e) {
      let image = new Image()
      // image.setAttribute('crossOrigin', 'anonymous')
      image.src = e
      let val = ''
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      let imageWidth = image.width / 2
      let imageHeight = image.height / 2
      let data = ''
      if (canvas.height > 200 && canvas.width > 200) {
        canvas.width = imageWidth
        canvas.height = imageHeight
        context.drawImage(image, 0, 0, imageWidth, imageHeight)
      } else {
        canvas.width = image.width
        canvas.height = image.height
        context.drawImage(image, 0, 0, image.width, image.height)
      }
      data = canvas.toDataURL('image/jpeg')
      val = data
      return val
    },
    async sendInformation () {
      const compressImg = await this.compressFunction(this.currUserDataInformation.userHeadImg)
      this.$set(this.currUserDataInformation, 'userHeadImg', compressImg)
      this.$socket.emit('connection', this.currUserDataInformation)
      this.inputDialogueBoxContentData.push(this.currUserDataInformation)
      this.currUserDataInformation.userDialogueContent = ''
    },
    judgeInformationClass (data, list) {
      data.id = list
      let userName = ''
      let userHeadImg = ''
      if (data.idntity === 'self') {
        data.bulleObject = 'send'
      } else {
        data.bulleObject = 'receive'
      }
      userName = data.userName
      userHeadImg = data.userHeadImg
      let value = {
        'id': data.id,
        'userId': data.userId,
        'userName': userName,
        'userHeadImg': userHeadImg,
        'userBulleContent': data.userDialogueContent,
        'bulleObject': data.bulleObject
      }
      return value
    },
    receiveInformation (data) {
      let value = this.judgeInformationClass(data, this.bulleList.length)
      this.bulleList.push(value)
    },
    outdialogue () {
      this.$router.go(-1)
    },
    getDialogueBoxContent () {
      this.$store.dispatch('user/getUserOrderInfo', {
        url: '/dialogueBox',
        params: {
          objectUserId: this.$route.params.objectUserId
        }
      }).then(resulte => {
        if (resulte !== null) {
          this.inputDialogueBoxContentData = resulte
          this.inputDialogueBoxContentData.forEach(element => {
            if (this.currUserDataInformation.userName === '' && element.idntity === 'self') {
              this.currUserDataInformation.userName = element.userName
              this.currUserDataInformation.userHeadImg = element.userHeadImg
            }
            let value = this.judgeInformationClass(element, this.bulleList.length)
            this.bulleList.push(value)
            if (element.userId !== this.currUserDataInformation.userId) {
              this.dialogueBoxName = element.userName
            }
          })
        } else {
          this.dialogueBoxName = resulte[0].userName
        }
      })
    },
    setBscroll () {
      this.scroll = new Bscroll(this.$refs.dialogueContent, {mouseWheel: true, click: true, tap: true})
      if ((this.$refs.dialogueContent.offsetHeight - this.$refs.dialogueContentWarpped.offsetHeight) < 100) {
        this.scroll.scrollTo(0, this.$refs.dialogueContent.offsetHeight - this.$refs.dialogueContentWarpped.offsetHeight, 1000)
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    dialogueContentWarppedHeight () {
      let base = 0
      let toalHeight = 0
      this.inputDialogueBoxContentData.forEach(e => {
        if (e.userDialogueContent.length > 8) {
          base += (e.userDialogueContent.length % 8)
        } else {
          base += 1
        }
      })
      toalHeight = base * 2.1 + 1
      return toalHeight
    }
  },
  sockets: {
    connect: function () {
      this.id = this.$socket.id
      this.$socket.emit('Bconnection', this.token)
    },
    airContent (data) {
      this.$nextTick(this.receiveInformation(data))
    }
  },
  watch: {
    bulleList: {
      handler () {
        this.setBscroll()
      },
      deep: true
    }
  },
  created () {
    this.getDialogueBoxContent()
  },
  mounted () {
    this.setBscroll()
    this.currUserDataInformation.userId = this.token
    this.$socket.emit('connect')
  },
  activated () {
    this.$socket.emit('Bconnection', this.token)
    this.setBscroll()
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
--contrainer-height = 13.33rem
--contrainer-width = 7.5rem
--header-height = 1rem
--header-width = 7.5rem
--headerOut-width = .5rem
--headerOut-height = .5rem
--headerTitle-width = 6rem
--headerTitle-height = .5rem
--dialogueContent-height = 11.3rem
--dialogueContent-width = 7.5rem
--dialogueRecord-width = 7.5rem
--dialogueRecord-height = 2.1rem
--dialogueRecordImg-width = .8rem
--dialogueRecordImg-height = .8rem
--dialogueRecordContent-width = 5rem
--dialogueRecordContent-height = 1rem
--dialogueRecordUserName-width = 5.7rem
--dialogueRecordUserName-height = .5rem
--sendInput-width = 6rem
--sendInnput-height = .5rem
--sendBtn-height = .5rem
--sendBtn-width = .8rem

.dialogueBox-contrainer
  position: relative
  left: 0
  top: 0
  height: --contrainer-height
  width: --contrainer-width
  background: white
  .dialogueBox-head
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    align-content: space-around
    width: --header-width
    height: --header-height
    background-image: linear-gradient($bgColorFirst,$bgColorFifth)
    border-radius: 0 0 .2rem .2rem
    .head-out
      width: --headerOut-width
      height: --headerOut-height
      .iconfont
        font-size: .4rem
        color: white
        font-weight: 600
    .head-userTitle
      width: --headerTitle-width
      height: --headerTitle-height
      .userTitle
        text-align: center
        line-height: --headerTitle-height
        color: white
        font-size: .4rem
  .dialogueBox-dialogueContent
    overflow: hidden
    height: --dialogueContent-height
    width: --dialogueContent-width
    .dialogueContent-warpped
      width: --dialogueContent-width
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-content: space-around
      .dialogueContent-bulleReceive
        padding: 0 .3rem
        box-sizing: border-box
        float: left
        width: --dialogueContent-width
        min-height: --dialogueRecord-height
        text-align: left
        box-sizing: border-box
        .bulleReceive-img
          float: left
          width: --dialogueRecordImg-width
          height: --dialogueRecordImg-height
          .img
            width: 100%
            height: 100%
            border-radius: .5rem
        .bulleReceive-userName
          margin-top: .3rem
          margin-left:.2rem
          float: left
          width: --dialogueRecordUserName-width
          height: --dialogueRecordUserName-height
          line-height: --dialogueRecordUserName-height
          color: #666
        .bulleReceive-container
          float: left
          margin:  0 0 .1rem 1rem
          min-height: --dialogueRecordContent-height
          max-width: --dialogueRecordContent-width
          line-height: --dialogueRecordContent-height
          word-wrap:break-word
          background: $bgColorFirst
          text-align: right
          padding: .1rem
          border-radius: .1rem .4rem .4rem .4rem
          .bulleReceive-content
            font-size: .4rem
            color: #333
            font-weight: 500
      .dialogueContent-bulleSend
        padding: 0 .3rem
        box-sizing: border-box
        float: right
        width: --dialogueContent-width
        min-height: --dialogueRecord-height
        text-align: right
        box-sizing: border-box
        .bulleSend-img
          float: right
          width: --dialogueRecordImg-height
          height: --dialogueRecordImg-height
          .img
            width: 100%
            height: 100%
            border-radius: .5rem
        .bulleSend-userName
          margin-top: .3rem
          margin-right:.2rem
          float: right
          width: --dialogueRecordUserName-width
          height: --dialogueRecordUserName-height
          line-height: --dialogueRecordUserName-height
          color: #666
        .bulleSend-container
          float: right
          margin: .1rem 1rem 0 0
          min-height: --dialogueRecordContent-height
          max-width: --dialogueRecordContent-width
          line-height: --dialogueRecordContent-height
          word-wrap:break-word
          background: $bgColorFirst
          text-align: left
          padding: .1rem
          border-radius: .4rem .1rem .4rem .4rem / .4rem .1rem .4rem .4rem
          .bulleSend-content
            font-size: .4rem
            color: #333
            font-weight: 500
  .dialogueBox-userInput
    height: 1rem
    width: --contrainer-width
    box-sizing: border-box
    padding: .2rem
    border-radius: .2rem  .2rem 0 0
    background: #d4cfcf
    .userInput-InputBox
      float: left
      width:  --sendInput-width
      height: --sendInnput-height
      .InputBox-contnet
        width: 100%
        height: 100%
        box-sizing: border-box
        border-radius: .2rem
        padding: .1rem .2rem
        color: #666
    .userInput-sendBtn
      float: right
      width: --sendBtn-width
      height: --sendBtn-height
      background: $bgColorFifth
      border-radius: .5rem
      text-align: center
      line-height: --sendBtn-height
      .sendBtn
        color: white
</style>
