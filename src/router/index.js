import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue"
import Cart from "@/views/Cart.vue"
import User from "@/views/User.vue"
import Test from "@/views/Test.vue"
import News from "@/views/News.vue"
import ProductDetails from "@/views/ProductDetails.vue"
import Goodslist from "@/views/Goodslist.vue"
// import NewsDetails from "@/views/NewsDetails.vue"
import Search from "@/views/Search.vue"
import fu from "@/views/fu.vue"

// 导入搜索商品组件
import SerachGoods from "@/views/SerachGoods.vue"

// 导入订单组件
import OrderList from "@/views/OrderList.vue"

// 导入进度条NProgress
import NProgress from "../../node_modules/nprogress/nprogress.js"
import "../../node_modules/nprogress/nprogress.css"

import store from "@/store/index.js"

Vue.use(VueRouter)  // 注册

// 创建路由
const router = new VueRouter({
    // 路由表
    routes: [
        { path: '/', redirect: "Home" },
        {
            path: '/home',
            component: Home,
            name: "Home",
            meta: {
                title: '首页',
                isShowBack: true,  // 控制返回  true 关闭  false 开启
                isShowNavBar: false, // 顶部导航栏
                mainPage: true
            },
            children: [{
                // 子路由不需要加/斜杠
                path: "search",
                component: Search,
                name: "Search",
                meta: {
                    pageTitle: "搜索",
                    isShowBack: true,
                    isShowNavBar: false
                },
            },
            {
                path: "serach-goods/:keyword",
                component: SerachGoods,
                name: "SerachGoods",
                meta: {
                    pageTitle: "搜索商品",
                    isShowBack: false,
                    isShowNavBar: false
                }
            }]
        },
        {
            path: '/cart',
            component: Cart,
            name: "Cart",
            meta: {
                title: '购物车',
                isShowBack: true,
                isShowNavBar: true,
                mainPage: true,
                requireAuth: true
            }
        },
        {
            path: '/user',
            component: User,
            name: "User",
            meta: {
                title: '个人中心',
                isShowBack: true,
                isShowNavBar: true,
                // 用来权限验证的   true:需要权限  false:不需要权限
                requireAuth: true,
                mainPage: true
            }
        },
        {
            path: '/test',
            component: Test,
            meta: {
                title: '测试',
                isShowBack: false,
                isShowNavBar: true,
                requireAuth: true
            }
        },
        {
            path: '/news',
            component: News,
            meta: {
                title: '新闻',
                isShowBack: false,
                isShowNavBar: true,
                requireAuth: true
            }
        },
        {
            // 这里需要写:id
            path: '/productDetails/:id',
            component: ProductDetails,
            props: true, // 允许props接受
            meta: {
                title: '商品详情',
                isShowBack: false,
                isShowNavBar: true
            }
        },
        {
            path: "/goodslist",
            component: Goodslist,
            meta: {
                title: "商品列表",
                isShowBack: false,
                isShowNavBar: true,
                requireAuth: false,
            }
        },
        {
            path: "/newsdetails/:id",
            //  懒加载
            component: () => import('@/views/NewsDetails.vue'),
            props: true,
            meta: {
                title: "新闻详情",
                isShowBack: false,
                isShowNavBar: true
            }
        },
        {
            path: '/login',
            component: () => import('@/views/Login.vue'),
            meta: {
                title: "登录",
                isShowBack: false,
                isShowNavBar: true
            }
        },
        {
            path: "/register",
            component: () => import('@/views/Register.vue'),
            meta: {
                title: "注册",
                isShowBack: false,
                isShowNavBar: true
            }
        },
        {
            path: "/address",
            component: () => import('@/views/Address.vue'),
            meta: {
                title: '收货地址',
                isShowBack: false,
                isShowNavBar: true,
                mainPage: false
            }
        },
        {
            path: '/editAddress/:addressInfo',
            props: true,
            component: () => import("@/views/EditAddress.vue"),
            meta: {
                title: '编辑地址',
                isShowBack: false,
                isShowNavBar: true
            }
        },
        {
            path: '/newAddress',
            component: () => import('@/views/NewAddress.vue'),
            meta: {
                title: '添加地址',
                isShowBack: false,
                isShowNavBar: true
            }
        },
        {
            path: "/orderlist",
            component: OrderList,
            meta: {
                title: "我的订单",
                isShowBack: false,
                isShowNavBar:true,
                requireAuth: true
            }
        },
        {
            path:'/orderDetails/:order_id',
            component:()=>import('@/views/orderDetails.vue'),
            props:true,
            meta:{
                title:'订单详情',
                isShowBack:false,
                isShowNavBar:true,
                requireAuth:true
            }
        },
        {
            path:'/fu',
            component:fu,
            props:true
        }

    ]
})

// 关闭进度条小圆圈
NProgress.configure({ showSpinner: false });


// 导航前守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    let { path } = to;
    let { requireAuth } = to.meta;
    // 获取token
    let token = store.state.token;
    // 判断token,进行权限验证
    if (token) {
        // 如果有token就代表有权限,并且是在登录页面,就跳到首页
        if (path === '/login') {
            next({
                path: "/home"
            })
        } else {
            next();   // 往下执行
        }
    } else {
        // 无token,没有权限,打到登录页面
        if (requireAuth) {
            // 抑制掉重复重定向的问题,捕获了错误
            router.push('/login').catch(() => { })
        } else {
            next() // 不需要权限,继续操作
        }
    }
})

// 导航后守卫
router.afterEach((to, from) => {
    NProgress.done();
})

// 默认导出
export default router