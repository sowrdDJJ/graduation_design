<template>
<div>
        <div class="register-box">
             <van-popup
            v-model="popupState"
            round
            :style="{ height: '10%', width: '40%',fontSize: '.4rem', textAlign: 'center', lineHeight: '1.3rem'}">注册成功</van-popup>
            <header class="register-header">
              <div class="cls-btn">
                <router-link tag="div" to="Login" class="cls">
                    <span class="iconfont">&#xe697;</span>
                </router-link>
              </div>
            </header>
            <main class="register-main">
              <div class="register-title">
                  <span>注&nbsp;&nbsp;册</span>
                  <div class="register-title-ornaments"></div>
              </div>
              <div class="register-content">
                  <div class="register-account">
                      <input type="text" id="register-account-content" placeholder="昵称" v-model="registerInformtion.name">
                  </div>
                  <div class="register-password">
                      <input type="password" id="register-password-content" placeholder="密码" v-model="registerInformtion.password">
                  </div>
                  <div class="register-telephone">
                      <input type="number" id="register-telephone-content" placeholder="电话号码" v-model="registerInformtion.telephone">
                  </div>
                  <div class="register-passwordPer">
                      <input type="password" id="register-passwordPer-content" placeholder="支付密码" v-model="registerInformtion.passwordPer">
                  </div>
              </div>
              <div class="register-btn" @click="submission">
                  <a href="javascript:;" class="btn-content" >
                      注册
                  </a>
              </div>
            </main>
      </div>
 </div>
</template>

<script>
export default {
  name: 'Accountregister',
  data () {
    return {
      registerInformtion: {
        name: null,
        password: null,
        telephone: null,
        passwordPer: null,
        actionState: 'register'
      },
      popupState: false,
      AccountData: 0,
      show: false
    }
  },
  methods: {
    submission () {
      this.$store.dispatch('user/postUserOrderInfo', {
        url: '/postUserInformation',
        params: {
          data: this.registerInformtion
        }
      }).then(resulte => {
        if (resulte) {
          this.popupState = true
          this.$router.push('/Account/Login')
        } else {
          this.$toast.fail('电话号码已注册')
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
--window-height = 13.5rem
--window-width = 7.5rem
--half-width = 3.5rem
--header-height = 1.5rem
--main-height = 11rem
--form-height = 5rem
--form-width = 7rem
--input-width= 6rem
--input-height = 1rem
--btn-width = 6rem
--btn-height = 1rem
  .register-box
    height: --window-height
    width: --window-width
    display: flex
    justify-content: center
    flex-wrap: wrap
    .register-header
      width: --window-width
      height: --header-height
      .cls-btn
        width: --window-width
        height: --header-height
        .cls
          width: .8rem
          height: .8rem
          margin: .3rem
          padding-right: .1rem
          line-height: .8rem
          font-size: .5rem
          font-weight: 600
          border-radius: .2rem
          background: white
          text-align: center
          color:white
          .iconfont
            font-size: .5rem
            font-weight: 600
            color: black
    .register-main
      height: --main-height
      width: --window-width
      display: flex
      justify-content: center
      flex-wrap: wrap
      align-content: space-around
      .register-title
        line-height: 1.5rem
        text-align: center
        font-size: 1rem
        color: white
      .register-content
        width: --form-width
        height: --form-height
        display: flex
        flex-wrap: wrap
        justify-content: center
        .register-account
          width: --input-width
          height: --input-height
          box-sizing: border-box
          line-height: 1.3rem
          font-size: .38rem
          font-weight: 600
          color: white
          #register-account-content
            background: none
            border-bottom: .1rem solid white
            border-radius: .1rem
            font-size: .5rem
            text-align: center
            color: white
            width: --input-width
        .register-password
          width: --input-width
          height: --input-height
          box-sizing: border-box
          line-height: 1.3rem
          font-size: .38rem
          font-weight: 600
          color: white
          #register-password-content
            background: none
            border-bottom: .1rem solid white
            border-radius: .1rem
            font-size: .5rem
            text-align: center
            color: white
            width: --input-width
        .register-telephone
          width: --input-width
          height: --input-height
          box-sizing: border-box
          line-height: 1.3rem
          font-size: .38rem
          font-weight: 600
          color: white
          #register-telephone-content
            background: none
            border-bottom: .1rem solid white
            border-radius: .1rem
            font-size: .5rem
            text-align: center
            color: white
            width: --input-width
        .register-passwordPer
          width: --input-width
          height: --input-height
          box-sizing: border-box
          line-height: 1.3rem
          font-size: .38rem
          font-weight: 600
          color: white
          #register-passwordPer-content
            background: none
            border-bottom: .1rem solid white
            border-radius: .1rem
            font-size: .5rem
            text-align: center
            color: white
            width: --input-width
      .register-btn
        width: --btn-width
        height: --btn-height
        background: white
        color: black
        border-radius: .2rem
        text-align: center
        .btn-content
          width: 100%
          line-height: 1rem
          font-size: .4rem
          color: black
          font-weight: 600
</style>
