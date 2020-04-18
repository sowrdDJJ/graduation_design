<template>
<div>
  <div class="personal-header">
      <div class="ornaments">
      </div>
      <div class="personal-header-content personal-more" >
          <span class="iconfont" @click="personalMoreShowFs">&#xe8b0;</span>
      </div>
      <div class="personal-header-content personal-name">
          <span class="myName">{{this.personalData.user_Name}}</span>
      </div>
      <div class="personal-header-content setUp" >
          <span class="iconfont" @click="personalSetupShow">&#xe8b7;</span>
      </div>
  </div>
  <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" :duration='400'>
    <div class="personal-more-content" v-if='personalMore'>
        <div class="personal-more-content-box" >
            <div class="out">
                <span class="iconfont" @click="personalMoreperservationFs">&#xe697;</span>个人信息
            </div>
            <form>
              <ul style="height: 93%">
                  <li class="personal-data-modify head">
                      <span class="personal-data-title">头像:</span>
                        <span class="personal-data-content">
                          <van-uploader
                          v-model="fileList"
                          multiple
                          :max-count="1"
                          :deletable='false'
                          />
                          <van-uploader :after-read="afterRead">
                          <a href="javascript:;">
                            <span class='iconfont'>&#xe8ac;</span>
                          </a>
                          </van-uploader>
                        </span>
                  </li>
                  <li class="personal-data-modify name">
                      <span class="personal-data-title">名称:</span>
                      <span class="personal-data-content">
                          <input
                          class="personal-data-content-input"
                          v-model="personalData.user_Name"
                          placeholder="请输入用户名"
                          v-text="personalData.user_Name"
                          />
                      </span>
                  </li>
                  <li class="personal-data-modify sex">
                      <span class="personal-data-title">性别:</span>
                      <van-radio-group
                      v-model="personalData.user_Sex"
                      class="personal-data-radio"
                      >
                        <van-radio class="van-radio" name="男" shape='square'>男</van-radio>
                        <van-radio class="van-radio" name="女" shape='square' checked-color='red'>女</van-radio>
                      </van-radio-group>
                  </li>
                  <li class="personal-data-modify birthday" >
                      <span class="personal-data-title" >年龄:</span>
                      <span class="personal-data-content">
                          <input
                          class="personal-data-content-input"
                          v-model="personalData.user_Age"
                          placeholder="请输入年龄"
                          v-text="personalData.user_Age"
                          />
                      </span>
                  </li>
                  <li class="personal-data-modify address" @click="showAreaFs">
                      <span class="personal-data-title">地址:</span>
                      <span class="personal-data-content">{{personalData.user_Address}}
                        <span class='iconfont'>&#xe8ac;</span>
                      </span>
                  </li>
                  <li class="personal-data-modify telephone">
                      <span class="personal-data-title">电话:</span>
                      <span class="personal-data-content">
                          <input
                          class="personal-data-content-input"
                          v-model="personalData.user_Telephone"
                          placeholder="请输入手机号"
                          />
                      </span>
                  </li>
              </ul>
            </form>
        </div>
        <van-overlay :show="areaShow"  @click="areaShow = false">
          <div class="wrapper" @click.stop>
            <div class="personal-data-area" v-show="areaShow">
             <area-component @cancelArea='cancelAreaFs' @areaData='inputAreaData'></area-component>
            </div>
          </div>
        </van-overlay>
    </div>
  </transition>
   <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" :duration='400'>
    <div class="personal-setUp" v-if="personalSetup">
        <div class="out">
            <span class="iconfont" @click="personalSetupShow">&#xe697;</span>个人信息
        </div>
        <div class="personal-setUp-content">
            <div class="personal-setUp-title">关于我们</div>
            <div class="personal-setUp-title">反馈意见</div>
            <div class="personal-setUp-title signOut" @click="outUser">退出登录</div>
        </div>
    </div>
   </transition>
</div>
</template>

<script>
import AreaComponent from 'component/area/Area'
import DateTime from 'component/datetime/DateTime'
import Bus from 'bus'
export default {
  name: 'PersonalHeader',
  components: {
    AreaComponent,
    DateTime
  },
  data () {
    return {
      personalMore: false,
      personalSetup: false,
      areaShow: false,
      ruleTelephone: 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/,
      areaData: '省/市/区',
      personalDataOld: null,
      personalData: {},
      fileList: [
        {url: '', isImage: true}
      ]
    }
  },
  methods: {
    personalMoreShowFs () {
      this.personalMore = !this.personalMore
      this.personalDataOld = this.personalDataChange
    },
    personalMoreperservationFs () {
      if (this.personalDataOld !== this.personalDataChange) {
        this.$dialog.confirm({
          title: '编辑信息',
          message: '是否对已修改的内容进行保存'
        }).then(async () => {
        // on confirm
          if (this.ruleTelephone.test(this.personalData.user_Telephone)) {
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true
            })
            this.personalData = this.personalDataChange
            const transtionImg = await this.compressFunction(this.fileList[0].url)
            let personalDataNew = {
              'user_Img': transtionImg,
              'user_Name': this.personalData.user_Name,
              'user_Sex': this.personalData.user_Sex,
              'user_Age': this.personalData.user_Age,
              'user_Address': this.personalData.user_Address,
              'user_Telephone': this.personalData.user_Telephone
            }
            this.$store.dispatch('user/emitUserData', personalDataNew)
              .then(reslute => {
                this.refreshuserHeadImg(reslute)
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.$toast('电话号码错误')
          }
        }).catch(() => {
        // on cancel
          this.$toast('取消')
          this.personalData = this.personalDataOld
          this.personalMore = !this.personalMore
        })
      } else {
        this.personalMore = !this.personalMore
      }
    },
    personalSetupShow () {
      this.personalSetup = !this.personalSetup
    },
    cancelAreaFs (e) {
      this.areaShow = e
    },
    inputAreaData (e) {
      this.personalData.user_Address = e.province + '  ' + e.city + '  ' + e.county
      this.areaShow = false
    },
    showAreaFs () {
      this.areaShow = true
    },
    outUser () {
      this.$dialog.confirm({
        title: '是否登出'
      }).then(() => {
        this.$toast.success('成功')
        this.$store.dispatch('user/resetToken', null)
        this.personalData = {
          'user_Img': null,
          'user_Id': null,
          'user_Name': null,
          'user_Sex': null,
          'user_Age': null,
          'user_Address': null,
          'user_Telephone': null
        }
        this.fileList = [
          {url: '', isImage: true}
        ]
        this.personalSetup = !this.personalSetup
        sessionStorage.clear()
        this.$router.push('/')
      }).catch(() => {
        this.personalSetup = !this.personalSetup
      })
    },
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
      canvas.width = imageWidth
      canvas.height = imageHeight
      context.drawImage(image, 0, 0, imageWidth, imageHeight)
      data = canvas.toDataURL('image/jpeg')
      val = data
      return val
    },
    afterRead (file) {
      this.fileList[0].url = this.compressFunction(this.fileList[0].url)
      this.fileList[0].url = file.content
      this.personalData.user_Img = this.fileList[0].url
    },
    async refreshuserHeadImg (res) {
      if (res) {
        this.personalData = res
        this.compressFunction(this.personalData)
        this.$toast('保存成功')
        this.$toast.clear()
        this.personalMore = !this.personalMore
        this.$set(res, 'user_Img', res.user_Img)
        this.$store.dispatch('user/obtionCurrUserData', res)
        Bus.$emit('updateUserHeadImg', res.user_Img)
      }
    },
    setPersonalInformation () {
      this.$store.dispatch('user/getInfo')
        .then(response => {
          this.personalData = response
          this.fileList[0].url = `/${this.personalData.user_Img}`
          Bus.$emit('updateUserHeadImg', this.personalData.user_Img)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    personalDataChange: {
      handler: (newData, oldData) => {
        if (newData !== oldData) {
          this.personalData = newData
        } else {
          this.personalData = oldData
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    personalDataChange () {
      return JSON.parse(JSON.stringify(this.personalData))
    }
  },
  created () {
    this.setPersonalInformation()
  },
  activated () {
    this.setPersonalInformation()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
--header-height = 2rem
--header-width = 7.5rem
--header-content-height = 13.3rem

.personal-data-content >>> .van-cell
  background: none
  width: 120% !important
  padding: .35rem 0px;
.personal-data-modify >>> .van-uploader__preview-image
  width: .7rem
  height: .7rem
  margin: .1rem 0
  border-radius: .3rem
.personal-data-content >>> .van-image
  margin: 0
.sex >>> .van-radio__label
  color: white
.personal-header
  display: flex
  justify-content: center
  width: --header-width
  height: --header-height
  .personal-header-content
    font-size: .5rem
    width: 30%
    height: --header-height
    margin: 0 2.5%
    color: white
    .iconfont
      font-size: .5rem
  .setUp
    box-sizing: border-box
    text-align: right
    padding: 0 .2rem
    line-height: 1rem
  .personal-name
    text-align: center
    line-height: 2.5rem
  .personal-more
    box-sizing: border-box
    text-align: left
    padding: 0 .2rem
    line-height: 1rem
  .ornaments
    z-index: -1
    position: absolute
    width: --header-width
    height: --header-height
    background-image: linear-gradient($bgColorSecond,$bgColorFifth)
    border-bottom-left-radius: --header-height
    border-bottom-right-radius: --header-height
    box-shadow: 0 .3rem 1rem $bgColorSecond;
.personal-more-content
  z-index: 99
  position: absolute
  top: 0
  display: flex
  width: --header-width
  height: --header-content-height
  background-image: linear-gradient($bgColorFourth, #ebecf1)
  .personal-more-content-box
    overflow: hidden
    height: 100%
    width: --header-width
    .out
      width: --header-width
      height: 8%
      line-height: 1rem
      padding-left: .2rem
      font-size: .4rem
      font-weight: 600
      color:white
      .iconfont
        font-size: .4rem
        font-weight: 600
        color:white
        margin-right: .2rem
    .personal-data-modify
      display: flex
      height: 1rem
      line-height: 1rem
      width: 80%
      float: left
      box-shadow: $box-shadow
      padding: 0.1rem 0.2rem
      margin-top: 0.5rem
      margin-left: .5rem
      background: $bgColorFirst
      border-radius: .5rem
      .img
        width: .8rem
        height: .8rem
        border-radius: .3rem
      .personal-data-title
        line-height: .8rem
        text-align: left
        color: white
        font-size: .3rem
      .personal-data-content
        line-height:.8rem
        width: 65%
        padding: 0 5%
        color: white
        .personal-data-content-input
          background: none
          line-height: .8rem
          font-size: .3rem
          margin-bottom: 5%
      .personal-data-radio
        width: 80%
        height: 100%
        .van-radio
          margin-left: .3rem
          height: 100%
          float: left
  .wrapper
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    .personal-data-area
      display: flex
      position: absolute
      left: 0
      top: 0
      background: #2d2a2aab;
      width: 100%
.personal-setUp
  z-index: 2
  display: flex
  position: absolute
  top 0
  bottom 0
  left 0
  right 0
  background-image: linear-gradient(red, #f36c5e)
  .out
    width: 100%
    height: 1rem
    line-height: 1rem
    padding-left: .2rem
    font-size: .4rem
    font-weight: 600
    color:white
    .iconfont
      font-size: .4rem
      font-weight: 600
      color:white
      margin-right: .2rem
  .personal-setUp-content
    position: absolute
    top: 4rem
    width: 100%
    height: 3.5rem
    .personal-setUp-title
      background: #f5bebe
      height: 1rem
      line-height: 1rem
      text-align: center
      margin-top: .2rem
      color: white
    .signOut
      background: #ea1c1c
</style>
