import axios from "axios"

// 导入全局Toast
import {
    Toast
} from "vant"

import store from "@/store/index.js"
import router from "@/router/index.js"




// 创建请求实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL + '/api', // 后面进行拼接
    timeout: 10000, // 超时时间
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // // 如果有token,添加请求头token,然后给服务器校验
    if (store.state.token) {
        config.headers['token'] = store.state.token;
    }
    //设置请求头，告诉服务端不要缓存，获取最新数据
    config.headers['If-Modified-Since'] = 0;


    // 在发送请求之前做些什么
    Toast.loading({
        message: "加载中",
        forbidClick: true
    });

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    Toast.clear()
    // 对响应数据做点什么
    // 如果状态码等于40001,代表token失效
    if(response.data.status === 40001){
        // 清空token
        store.commit('setToken', '')
        // 成功或者失败都会提示
        Toast(response.data.message)
        // 路由替换
        router.replace({
            path:"/login",
            query:{
                // 获取当前路由的完整地址,登陆成功后跳到你之前的路由地址
                redirect:router.currentRoute.fullPath
            }
        })
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    Toast.clear()  // 清除提示
    return Promise.reject(error);

});

// 导出实例
export default instance

