// 导入请求实例

 import axios  from "./request.js";


 //登录  formData是一个对象里面存放了用户名和密码
 export function fetchLogin(formData){
     return axios.post('/login',formData)
 }


 //注册
 export function fetchRegister(formData){
    return axios.post('/register',formData)
}

// 上传文件
export function upload(formData){
    return axios.post('/upload',formData)
}