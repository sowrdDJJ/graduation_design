<template>
  <div class="Account">
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration='1000'
    >
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Account'
}
</script>

<style lang='stylus' scoped>
.Account
  height: 13.35rem
  width: 7.5rem
  background: url('https://game.gtimg.cn/images/lol/act/a20191028senna/senna_1920_1080.jpg') center no-repeat
  background-size: 13.5rem 100%
</style>
