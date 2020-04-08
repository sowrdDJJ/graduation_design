<template>
  <div>
    <div class="emitAddress-title">
        <div class="out" @click="goBack">
                <span class="iconfont">&#xe697;</span>
        </div>
        <div class="title">
          <span>地址编辑</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmitAddressHeader',
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.emitAddress-title
  .out
    width: .5rem
    height: .5rem
    margin: .3rem
    padding-right: .1rem
    line-height: .5rem
    font-size: .4rem
    font-weight: 600
    border: .05rem solid white
    border-radius: .2rem
    background: white
    color: #666
    .iconfont
      font-size: .5rem
      font-weight: 600
      color: #fd0e0e
  .title
    display: flex
    position: absolute
    top: .1rem
    left: 30%
    width: 40%
    height: 1rem
    line-height: 1rem
    color: #666
    font-size: .4rem
    font-weight: 600
    span
      text-align: center
      margin-left: .7rem
</style>
