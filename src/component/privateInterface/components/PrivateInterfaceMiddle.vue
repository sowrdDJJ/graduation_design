<template>
  <div class="container privateInterfacee-mieddle">
    <div class="row">
      <div class="col-10 offset-1 text-center">
        <a class="btn  privateInformation-name display-4">{{privateInformations.user_Name}}</a>
      </div>
    </div>
    <div class='row pt-1 pb-2 px-1'>
      <div class="col-6 offset-3 p-1  privateInterface-handImg">
          <img  :src="privateInformations.user_Img" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <a class="btn btn-dark   privateInformation ">这人什么也留下</a>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <a class="btn   mt-1  privateInformation ">{{privateInformations.user_Address}}</a>
        <a class="btn   mt-1 privateInformation">账号：{{privateInformations.user_Telephone}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: 'privateInterfaceMieddle',
  props: {
    privateInformations: Object
  }
}
</script>

<style lang='stylus' scoped>
@keyframes animateHeadImg {
  0%{
    background: none
    transform: rotate(0, 0)
  }
  25%{
    background: rgba(107, 104, 104, 0.761)
    transform: rotate(0.1, 0.1)
  }
  50%{
    background: rgba(107, 104, 104, 0.761)
    transform: rotate(0.5, 0.5)
  }
  75%{
    background: rgba(107, 104, 104, 0.761)
    transform: rotate(0.75, 0.75)
  }
  100%{
    background: rgba(107, 104, 104, 0.761)
    transform: rotate(1, 1)
  }
}
.privateInterfacee-mieddle
  width: 100%
  height: 100%
  padding: 0
  .privateInterface-handImg
    height: 3.5rem
    width: 2rem
    text-align: center
    border-radius: 50%
    animation animateHeadImg 5s
    animation-fill-mode: forwards
    img
      height: 90%
      width: 90%
      margin-top: 5%
      border-radius: 50%
  .privateInformation-name
    color: white
    font-size: .7rem
  .privateInformation
    color: white
    font-size: .2rem
    background: #a7a2a261
</style>
