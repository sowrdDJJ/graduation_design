
<template>
  <div id="app">
    <!-- 显示当前地址的内容 -->
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration='400'
    mode="out-in">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    </transition>
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration='400'
    mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState () {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style>

</style>
