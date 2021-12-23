import axios from "./request.js";

// 添加地址
export function fetchNewAddress(userId,formData){
    return axios.post(`/addaddress/${userId}`,formData)
}

// 用户地址
export function fetchUserAddress(userId){
    return axios.get(`/getaddress/${userId}`)
}

// 删除地址
export function fetchDeleteAddress(addressId){
    return axios.post(`/deladdress/${addressId}`)
}

// 更新地址
export function fetchUpdateAddress(addressId,addressInfo){
    return axios.post(`/updateaddress/${addressId}`,addressInfo)
}