import Vue from 'vue'
import App from './App.vue'
// 导入vantui
import "@/vantui.js"

// 导入封装的请求
import "@/util/index.js"

// 导入router
import router from "@/router/index.js"


// 导入规范化的样式
import "@/assets/scss/normalize.css"

// 导入字体图标
import "@/assets/scss/iconfont.css"


//导入过滤器
import "@/filters/index.js"

// 复制内容到剪切板
import VueClipboard from 'vue-clipboard2'



import store from "@/store/index.js"


Vue.config.productionTip = false

Vue.use(VueClipboard)

new Vue({
  router, // 挂载
  store,
  render: h => h(App)
}).$mount('#app')
