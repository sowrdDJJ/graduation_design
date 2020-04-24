<template>
<div>
        <div class="login-box">
          <header class="login-header">
            <div class="cls-box">
              <div class="cls" @click="registerCls">
                <span class="iconfont">&#xe697;</span>
              </div>
            </div>
            <div class="register-btn-box">
              <div class="register-btn">
                  <!-- <router-link to="register" class="btn-content" >
                      注册
                  </router-link> -->
              </div>
            </div>
          </header>
          <main class="login-main">
            <div class="login-title">
                <span>H&nbsp;E&nbsp;L&nbsp;L&nbsp;O</span>
                <div class="login-title-ornaments"></div>
            </div>
            <div class="login-content">
              <form>
                <div class="login-account">
                    <input type="text" id="account-content" placeholder="账号" v-model="loginForm.account">
                </div>
                <div class="login-password">
                    <input type="password" id="password-content" placeholder="密码" v-model="loginForm.password">
                </div>
              </form>
            </div>
            <div class="login-btn" @click="submission">
                <a href="javascript:;" class="btn-content" >
                    登录
                </a>
            </div>
          </main>
      </div>
 </div>
</template>

<script>
export default {
  name: 'AccountLogin',
  data () {
    return {
      loginForm: {
        account: '15364024159',
        password: '12346'
      }
    }
  },
  methods: {
    submission () {
      if (this.loginForm.account.length === 0 || this.loginForm.password.length < 4) {
        this.$toast.fail('请重新输入')
      } else {
        this.$store.dispatch('user/login', this.loginForm)
          .then(() => {
            this.$router.push(`/user/personal`)
          })
          .catch((err) => {
            console.log(err)
            this.$toast.fail('请求失败')
          })
      }
    },
    registerCls () {
      this.$router.push('/')
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
--form-height = 3rem
--form-width = 7rem
--input-width= 6rem
--input-height = 1rem
--login-width = 6rem
--login-height = 1rem

  .login-box
    height: --window-height
    width: --window-width
    display: flex
    justify-content: center
    flex-wrap: wrap
    .login-header
      width: --window-width
      height: --header-height
      display: flex
      justify-content: center
      align-items: center
      .cls-box
        width: --half-width
        height: 1rem
        display: flex
        align-items: center
        justify-content: flex-start
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
          .iconfont
            font-size: .5rem
            font-weight: 600
            color: black
      .register-btn-box
        display: flex
        align-items: center
        justify-content: flex-end
        width: --half-width
        height: 1rem
        .register-btn
          width: 1.5rem
          height: .7rem
          background: white
          color: black
          border-radius: .2rem
          text-align: center
          .btn-content
            width: 100%
            line-height: .7rem
            font-size: .3rem
            color: black
            font-weight: 600
    .login-main
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-items: center
      width: --window-width
      height: --main-height
      .login-title
        width: --window-width
        height: 1rem
        line-height: 1rem
        text-align: center
        font-size: 1rem
        color: white
      .login-content
        height: --form-height
        width: --form-width
        display: flex
        flex-wrap: wrap
        justify-content: center
        align-items: center
        .login-account
          width: --input-width
          height: --input-height
          box-sizing: border-box
          line-height: 1rem
          font-size: .38rem
          font-weight: 600
          color: white
          margin-bottom: .2rem
          #account-content
            background: none
            border-bottom: .1rem solid white
            border-radius: .1rem
            font-size: .5rem
            text-align: center
            color: white
            width: 100%
        .login-password
          width: --input-width
          height: --input-height
          box-sizing: border-box
          line-height: 1rem
          font-size: .38rem
          font-weight: 600
          color: white
          #password-content
            background: none
            border-bottom: .1rem solid white
            border-radius: .1rem
            font-size: .5rem
            text-align: center
            color: white
            width: 100%
      .login-btn
        width: --login-width
        height: --login-height
        background: white
        color: black
        border-radius: .2rem
        text-align: center
        .btn-content
          width: --login-width
          line-height: 1rem
          font-size: .4rem
          color: black
          font-weight: 600
</style>
