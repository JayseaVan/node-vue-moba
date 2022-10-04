import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import http from './http'
Vue.prototype.$http = http

import './style.css'

Vue.config.productionTip = false

// 定义全局mixin，包含方法、计算属性等，所有组件都能使用
Vue.mixin({
  // 上传地址
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  // 上传图片发送请求校验，加一个 Authorization 请求头(表示授权信息)，用来发送token
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
