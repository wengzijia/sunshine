import Vue from "vue"
import axios from "axios"


// 以下不会触发请求和响应拦截器    调用 this.$httpGet(地址)
Vue.prototype.$httpGet = function(url){
    return axios.get(url)
}

Vue.prototype.$httpPost = function(url,data){
    return axios.post(url,data)
}