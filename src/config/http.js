
import router from '../router'
import axios from 'axios'
import qs from 'qs'

// axios.defaults.timeout = 10000;
// axios.defaults.baseURL = 'https://wxtest.ixuenong.com/proxy/wechat/';
axios.defaults.baseURL = 'https://wx.ixuenong.com/proxy/wechat/';


axios.defaults.transformRequest = [function(data) {
    // 数据序列化  整理post请求的数据
    return qs.stringify(data);
}]

//  http respose 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.resultCode === 6) {   // token过期 重新授权
            router.push({
                path: '/'
            })
            // Author();
        } else if(response.data.resultCode === 7) { // 绑定手机号码
            router.replace({
                path: `/login?${window.location.hash.split('#')[1]}`
            })
        }

        return response;
    },
    error => {
        return Promise.reject(error.response.data);
    }
)

//  get 请求
export function get(url, params = {}) {

    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

//  post 请求  没有 catch 的情况
export function post(url, data = {}) {

    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}