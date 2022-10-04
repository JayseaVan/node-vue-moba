import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api',
})

// 给所有 http 请求加一个请求头（Request Headers），把localstorage中的东西提取出来
// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 加一个 Authorization 请求头(表示授权信息)，用来发送token，由于行业规范，需要在token前加上 'Bearer '，表示类型
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    // console.log(localStorage.token)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 给 http 添加一个拦截器，全局捕获错误
// https://www.npmjs.com/package/axios#interceptors
http.interceptors.response.use(res => {
    return res
}, err => {
    // 在客户端统一监听服务器返回的JSON格式的错误信息，并通过Vue显示出来 (Vue.prototype.$message()是elementUI定义的一个方法)
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http;