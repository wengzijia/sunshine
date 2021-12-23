import Vue from "vue"
import Vuex from "vuex"
// 永久存储
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex); // 调用this.$store


// 创建仓库store
const store = new Vuex.Store({
    // state状态（即共享的数据）
    // 调用： this.$store.state.xxx
    state: {
        token: '',
        cartData: [],
        userInfo: ""
    },
    // mutation: 同步修改数据。修改state中的数据的唯一途径。
    mutations: {
        // state是共享数据
        // 保存token
        setToken(state, token) {
            state.token = token
        },
        // 保存用户信息
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        // 上传用户头像
        uploadPhoto(state,photo){
            state.userInfo.avatar = photo
        },
        // 清空购物车数据
        clearCartData(state){
            state.cartData = state.cartData.filter(item=>item.selected !== true)
        },
        // goods是商品详情组件传过来的数据
        addCartGoods(state, goods) {
            // 先找到数组中有没有和传过来的商品id相同
            // -1 表示没有相同商品   1 表示有相同的商品
            let index = state.cartData.findIndex(item => item.id === goods.id);
            // 如果没有相同的商品,就把商品数据加在前面
            if (index === -1) {
                state.cartData.unshift(goods)
            } else {
                // 否则就只累加商品数量
                state.cartData[index].number += goods.number
            }
        },
        // 商品选中状态
        setGoodsChecked(state, { id, selected }) {
            let index = state.cartData.findIndex(item => item.id === id)
            state.cartData[index].selected = selected
        },
        // 商品购买数量
        setGoodsNumber(state, { id, number }) {
            let index = state.cartData.findIndex(item => item.id === id);
            state.cartData[index].number = number
        },
        //删除商品
        delGoods(state, id) {
            // 过滤掉传过来的id商品,并重新赋给购物车数据  比如 1,2,3  传过来的id是1,  那就只剩下2,3 
            state.cartData = state.cartData.filter(item => item.id !== id)
        },
        // 清除用户信息
        clearUserInfo(state) {
            state.token = ''    // 清除token
            state.cartData = [] // 清空数据
            state.userInfo = {} // 清空用户信息
        }
    },
    // getters对state中的数据进行筛选之后返回(类似于计算属性computed)
    // 调用： this.$store.getters.xxxxxx
    getters: {
        // 商品总数量
        getTotalNumber(state) {
            let totalNumber = 0;
            // 统计每个商品的数量总和
            state.cartData.forEach(item => totalNumber += item.number)
            return totalNumber
        },
        // 商品id 比如:6,8
        getGoodsIds(state) {
            // 返回逗号隔开的id
            return state.cartData.map(item => item.id).join(',')
        },
        // 获取选中的购物车商品id
        getSelectedGoodsIds(state){
            let ids = [];
            state.cartData.forEach(item=>{
                // 选中的时候把id加进去
                item.selected && ids.push(item.id)
            })
            // 返回ids并用逗号隔开
            return ids.join(',')
        },
        // 获取id的数量
        getNumberById(state) {
            let idNumMap = {};
            state.cartData.forEach(item => {
                idNumMap[item.id] = item.number
            })
            return idNumMap;
        },
        // 选中的商品id
        getStatusId(state) {
            let idCheckedMap = {};
            // 利用映射的方法来决定有没有选中
            state.cartData.forEach(item => {
                idCheckedMap[item.id] = item.selected
            })
            return idCheckedMap
        },
        // 选中商品的总数量
        getSelectedTotalNumber(state) {
            let totalNumber = 0;
            state.cartData.forEach(item => item.selected && (totalNumber += item.number))
            return totalNumber;
        },
        // 商品数量总价格
        getTotalPrice(state) {
            let totalPrice = 0;
            // 解构  &&后面的括号把他当做一个整体
            state.cartData.forEach(({ sell_price, number, selected }) => selected && (totalPrice += number * sell_price))
            return totalPrice
        }
    },
    // 插件
    // createPersistedState会自动同步到本地存储
    plugins: [createPersistedState({
        key: 'Vuex-token'  // 改名字
    })]
})

// 暴露
export default store