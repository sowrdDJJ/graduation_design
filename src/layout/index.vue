<template>
  <div :style="selfAdaption" class="app-wrapper">
    <div class="appWrapper">
        <appMain />
    </div>
    <div class="fixd-header">
        <navigation />
    </div>
  </div>
</template>

<script>
import appMain from './components/AppMain'
import navigation from '@/component/navigation/navigation'
export default {
  name: 'Layout',
  components: { appMain, navigation },
  data () {
    return {
      selfAdaption: {
        height: document.body.clientHeight,
        width: document.body.clientWidth
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.appWrapper
  width: 7.5rem
  height: 12.3rem
.fixd-header
  width: 7.5rem
  height: 1.03rem
</style>
