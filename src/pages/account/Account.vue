<template>
  <div class="Account">
    <div class="container">
      <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
      mode="out-in"
      :duration='500'
      >
      <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account'
}
</script>

<style lang='stylus' scoped>
--window-height = 13.35rem
--window-width = 7.5rem

.Account
  height: --window-height
  width: --window-width
  background: url('https://game.gtimg.cn/images/lol/act/a20191028senna/senna_1920_1080.jpg') center no-repeat
  background-size: 13.5rem 100%
  .container
    height: --window-height
    width: --window-width
    background-image: linear-gradient(#423b3b69, #000000);
</style>
