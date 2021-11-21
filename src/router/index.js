import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue"
import Cart from "@/views/Cart.vue"
import User from "@/views/User.vue"
import Test from "@/views/Test.vue"

// 导入进度条NProgress
import NProgress from "../../node_modules/nprogress/nprogress.js"
import "../../node_modules/nprogress/nprogress.css"


Vue.use(VueRouter)  // 注册

// 创建路由
const router = new VueRouter({
    // 路由表
    routes: [
        { path: '/', redirect: "Home" },
        { 
        path: '/home',
        component: Home,
        meta:{
            title:'首页',
            isShowBack:true,
            isShowNavBar:false
        }
        },
        { 
            path: '/cart',
             component: Cart,
             meta:{
                 title:'购物车',
                 isShowBack:true,
                 isShowNavBar:true
             }
        },
        { 
            path: '/user', 
            component: User,
            meta:{
                title:'个人中心',
                isShowBack:true,
                isShowNavBar:true
            }
        },
        {
            path:'/test',
            component:Test,
            meta:{
                title:'测试',
                isShowBack:false,
                isShowNavBar:true
            }
        }
    ]
})

// 关闭进度条小圆圈
NProgress.configure({ showSpinner: false });


// 导航前守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
})

// 导航后守卫
router.afterEach((to, from) => {
    NProgress.done();
  })

// 默认导出
export default router