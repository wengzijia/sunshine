import Vue from 'vue'
import App from './App.vue'
// 导入vantui
import "@/vantui.js"

// 导入封装的请求
import "@/util/index.js"

// 导入router
import router from "@/router/index.js"


Vue.config.productionTip = false

new Vue({
  router, // 挂载
  render: h => h(App)
}).$mount('#app')
