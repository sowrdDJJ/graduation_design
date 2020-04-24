// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vant from 'vant'
import VueRouter from 'vue-router'
import 'vant/lib/index.css'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import animated from 'animate.css'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
import 'babel-polyfill'
import store from './store'
import './assets/js/rem'
import './premission'
import 'jquery/dist/jquery.min'
// import vConsole from '@/assets/js/vconsole'
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(animated)
Vue.use(Vant)
Vue.use(VueRouter)
Vue.use(new VueSocketio({
  debug: true,
  connection: socketio('http://47.102.215.151:3240'),
  transports: ['websocket']
}))

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router等于router：router
  router,
  store,
  // vConsole,
  // store,
  // 局部主键
  components: { App },
  template: '<App/>'
})
