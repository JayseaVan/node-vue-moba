import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import router from './router'

// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 引入字体图标
import './assets/font-icon/iconfont.css'

// 全局引入Card组件
import Card from './components/Card.vue'
Vue.component('m-card', Card)

// 全局引入ListCard组件
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

// 引入axios，并全局注册http请求接口
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
}).$mount('#app')
