<template>
 <div class="order-box">
  <header class="order-header">
    <order-head></order-head>
  </header>
  <main class="order-main">
    <order-middle></order-middle>
  </main>
 </div>
</template>

<script>
import OrderHead from './components/OrderHead'
import OrderMiddle from './components/OrderMiddle'
export default {
  name: 'Order',
  components: {
    OrderHead,
    OrderMiddle
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
--window-width = 7.5rem
--window-height = 12.3rem
--header-height = 1.5rem
--header-width = 7.5rem
--main-height = 10.8rem
--main-width = 7.5rem

.order-box
  z-index: 3
  background: white
  height: --window-height
  width: --window-width
  .order-header
    width: --header-width
    height: --header-height
  .order-main
    width: --main-width
    height: --main-height
</style>
