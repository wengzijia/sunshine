// 导入请求实例
import axios from "./request.js"

// 请求轮播图
export function fetchCarousel() {
    return axios.get('/getlunbo')
}

// 请求推荐商品
export function fetchProductList(page = 1, limit = 14) {
    return axios.get(`/recommend?page=${page}&limit=${limit}`)
}

// 请求新闻列表
export function fetchNewsList(page = 1, limit = 14) {
    return axios.get(`/getnewslist?page=${page}&pagesize=${limit}`)
}

// 请求商品列表
export function fetchGoodsList(page = 1, limit = 14) {
    return axios.get(`/getgoods?pageindex=${page}&pagesize=${limit}`)
}

// 请求新闻详情
export function fetchNewsDetail(news_id) {
    return axios.get(`/getnew/${news_id}`)
}

//请求新闻评论
export function fetchComments(goods_id, pageindex) {
    return axios.get(`/getcomments/${goods_id}?pageindex=${pageindex}`)
}

// 请求发布评论内容(post)
export function fetchPostComment(newsId, content) {
    return axios.post(`/postcomment/${newsId}`, {
        content
    })
}

// 请求商品基本信息
export function fetchGoodsInfo(goodsid) {
    return axios.get(`/getgoodsinfo/${goodsid}`)
}

// 请求商品轮播图片
export function fetchViewpager(picid) {
    return axios.get(`/getthumbimages/${picid}`)
}

// 请求商品搜索
export function fetchSearchGoods(options) {
    let {
        value,
        sort,
        order,
        page,
        pagesize
    } = options;
    return axios.get(`/search?value=${value}&sort=${sort}&order=${order}&page=${page}&pagesize=${pagesize}`)
}

// 请求购物车商品列表
export function  fetchCartGoodsList(ids){
    return axios.get(`/getshopcarlist/${ids}`)
}