import axios from "axios";
import { Message } from 'element-ui';
import router from "../router/index"

//请求拦截器
axios.interceptors.request.use(config => {
    // 如果存在token，请求携带这个token
    if (window.sessionStorage.getItem("token")) {
        config.headers['token'] = window.sessionStorage.getItem('token');
    }
    return config;
}, error => {
    console.log(error);
})

// 响应拦截器
axios.interceptors.response.use(success => {
    // 响应成功
    if (success.status && success.status == 200) {
        // 业务逻辑错误
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({message: success.data.msg})
            return;
        }
        // 业务逻辑正确
        if (success.data.msg) {
            Message.success({message: success.data.msg})
        }
    }
    return success.data
    // 响应失败
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({message: '页面未找到'})
    } 
    if (error.response.code == 401) {
        Message.error({message: '尚未登录'})
        router.replace('/Login')
    } 
    if (error.response.code == 403) {
        Message.error({message: '权限不足'})
    } else {
        if(error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误'})
        }
    }
    return;
})

let base = '';

// 传送json格式的get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

// 传送json格式的post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

// 传送json格式的put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

// 传送json格式的delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
