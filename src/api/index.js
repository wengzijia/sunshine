// 导入请求实例
import axios from "./request.js"

// 请求轮播图
export function fetchCarousel() {
    return axios.get('/getlunbo')
}

// 请求推荐商品
export function fetchProductList(page=1,limit=14){
    return  axios.get(`/recommend?page=${page}&limit=${limit}`)
}