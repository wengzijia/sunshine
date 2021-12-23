import axios from "./request.js"


// 下单
export function fetchPlaceOrder(orderData){
    return axios.post('/commitorder',orderData)
}

// 用户订单列表
export function fetchUserOrder(userId){
    return axios.post(`/userorder/${userId}`)
}

// 获取订单信息
export function fetchOrderInfo(orderId){
    return axios.post(`/getorder/${orderId}`)
}

// 获取物流信息
export function fetchLogistics(){
    return axios.get('/kuaidi100')
}