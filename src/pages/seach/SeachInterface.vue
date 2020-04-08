<template>
  <div class="seach-box">
    <seach-header></seach-header>
    <seach-middel></seach-middel>
  </div>
</template>

<script>
import SeachHeader from './components/Header'
import SeachMiddel from './components/Middel'
export default {
  name: 'SeachInterface',
  components: {
    SeachHeader,
    SeachMiddel
  }
}
</script>

<style lang='stylus' seoped>
@import '~styles/varibles.styl'
.seach-box
  z-index: 99
  position: absolute
  top: 0
  display: flex
  height: 14rem
  width: 7.5rem
  background-image: $bgColorLinearGradient
</style>
